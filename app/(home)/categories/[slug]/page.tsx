import { Feed } from "@/components/home/Feed";
import { fetchCategoriesAction } from "@/actions/Category-Actions";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const { data } = await fetchCategoriesAction();
    return data ? data.map(category => ({ slug: category.url })) : [];
}

const CategoryPage = ({ params, searchParams }: { params: { slug: string }, searchParams: { page: string } }) => {
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <Feed category={params.slug} currentPage={currentPage} />
    );
}

export default CategoryPage;