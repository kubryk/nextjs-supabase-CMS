'use server'
import FeedPost from "./FeedPost";
import Container from "../Container";
import { useSearchParams } from "next/navigation";
import Pagination from "../customUI/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { PostgrestResponseFailure } from "@supabase/postgrest-js";
import { fetchSingleCategoryByAction } from "@/actions/Category-Actions";
import { fetchPageOfCategoryPostsByAction, fetchPageOfPostsByAction, fetchPostsByAction } from "@/actions/Post-Actions";

export const Feed = async ({ currentPage, category }: { currentPage: number, category?: string }) => {

    if (category) {
        //Фетчимо дані категорії
        const categoryData = await fetchSingleCategoryByAction('url', category);
        //Якщо категорія в базі не знайдена
        if (!categoryData.data) return <div>Category not found</div>

        //Фетчимо всі пости по певній категорії
        const categoryPosts = await fetchPostsByAction('category', categoryData.data.id);

        //Фетчимо пости по певній категорії для одної сторінки
        const pagePostsByCategory = await fetchPageOfCategoryPostsByAction({
            pageOptions: {
                currentPage,
                pageSize: 6
            },
            columnOptions: {
                column: 'status',
                equal: 'publish'
            },
            category: categoryData.data.id
        });





        //Якщо масиву данних нема - помилка з серверу
        if (!categoryPosts.data || !pagePostsByCategory.data) return <div>Error fetching category posts</div>
        //Якщо масив даних пустий - данні в базі відсутні
        if (!categoryPosts.data.length) return <div>Posts not found</div>

        //відбираємо тільки опубліковані
        const publishedCategoryPosts = categoryPosts.data.filter((post) => post.status === 'publish')
        //Визначаємо кількість сторінок
        const totalPages = Math.ceil(publishedCategoryPosts.length / 6)


        return (
            <section className="animate-in zoom-in duration-200 flex-1 flex flex-col gap-20 max-w-4xl px-3 p-8">
                <Container>
                    <div className="flex flex-col gap-8">
                        {/* {!pagePostsByCategory.data && <div>Posts not found</div>} */}
                        {pagePostsByCategory.data.map((post) => {
                            return <FeedPost key={post.id} postData={post} />
                        })}
                        <Pagination totalPages={totalPages} />
                    </div>
                </Container>
            </section>
        )
    }




    //Якщо нема категорії
    const posts = await fetchPostsByAction('status', 'publish');
    const pagePosts = await fetchPageOfPostsByAction({
        pageOptions: {
            currentPage,
            pageSize: 6
        },
        columnOptions: {
            column: 'status',
            equal: 'publish'
        }
    });
    //Якщо масиву данних нема - помилка з серверу
    if (!posts.data || !pagePosts.data) return <div>Error fetching posts</div>
    //Якщо масив даних пустий - данні в базі відсутні
    if (!posts.data.length) return <div>Posts not found</div>


    //Визначаємо кількість сторінок
    const totalPages = Math.ceil(posts.data.length / 6);

    return (
        <section className="animate-in zoom-in duration-200 flex-1 flex flex-col gap-20 max-w-4xl px-3 p-8">
            <Container>
                <div className="flex flex-col gap-8">
                    {pagePosts.data.map((post) => {
                        return <FeedPost key={post.id} postData={post} />
                    })}
                    <Pagination totalPages={totalPages} />
                </div>
            </Container>
        </section>
    )

}