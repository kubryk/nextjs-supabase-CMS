'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { Button } from '../../ui/button';
import { useEffect } from 'react';
import { PostCategoryType } from '@/types/global';
import { PuffLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { fetchCategoriesAction } from "@/actions/Category-Actions";
import useServerAction from '@/hooks/useServerAction';
import { deleteCategoryAction } from "@/actions/Category-Actions";



const DashboardCategories = () => {
    const router = useRouter();

    //Фетч постів
    const categories = useServerAction<PostCategoryType[], null>({
        action: fetchCategoriesAction,
    });

    //Видалення поста
    const deleteCategory = useServerAction<null, any>({
        action: deleteCategoryAction,
        toast: true,
        successMessage: 'Category has been deleted'
    });

    //Фетчимо всі пости при загрузці сторінки
    useEffect(() => { categories.useAction() }, [])

    //Видалення поста
    const deleteCategoryOnClick = async (categoryId: string) => {
        //Видаляємо пост
        await deleteCategory.useAction({ categoryId })
        //Фетчимо нові пости
        await categories.useAction()
    }

    return (
        <>
            {categories.data &&
                <Table >
                    <TableHeader>
                        <TableRow >
                            <TableHead >Name</TableHead>
                            <TableHead >Url</TableHead>
                            <TableHead >Date</TableHead>
                            <TableHead >Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories.data && categories.data.map((category) => {
                            const convertedDate = new Date(category.created_at).toLocaleDateString('en-ZA');
                            return (
                                <TableRow key={category.id}>
                                    <TableCell className={"font-bold"}>{category.name}</TableCell>
                                    <TableCell >
                                        <Link className=' hover:text-blue-600' href={`/categories/${category.url}`}>
                                            {category.url}
                                        </Link>
                                    </TableCell>
                                    <TableCell >{convertedDate}</TableCell>
                                    <TableCell className="text-right flex gap-4 ">
                                        <Button className=' hover:bg-gray-600' variant={'secondary'} onClick={() => router.push(`/control-panel/categories/update?id=${category.id}`)}>Edit</Button>
                                        {deleteCategory.isLoading && <PuffLoader size={30} />}
                                        {!deleteCategory.isLoading && <Button variant={'destructive'} onClick={async () => await deleteCategoryOnClick(category.id)}>Delete</Button>}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </>
    );
}

export default DashboardCategories;