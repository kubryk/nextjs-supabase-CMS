import { Feed } from "@/components/home/Feed";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { PostCategoryType } from "@/types/global";
import { fetchCategoriesAction } from "@/actions/Category-Actions";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const { data } = await fetchCategoriesAction();
    if (data) {
        return data.map(category => ({
            slug: category.url
        })
        )
    }
}

const CategoryPage = ({ params, searchParams }: { params: { slug: string }, searchParams: { page: string } }) => {
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <Feed category={params.slug} currentPage={currentPage} />
    );
}

export default CategoryPage;