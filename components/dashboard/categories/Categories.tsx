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
import { HTMLAttributes, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchCategories } from "@/features/category/fetchCategoriesSlice";
import { deleteCategory } from "@/features/category/deleteCategorySlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



const DashboardCategories = (props: HTMLAttributes<HTMLDivElement>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector(state => state.fetchCategories);
    const { deleteResult, deleteLoading, deleteError } = useAppSelector(state => state.deleteCategory);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const updateHandler = (id: string) => {
        router.push(`/dashboard/categories/update?id=${id}`)
    }
    const deleteHandler = (id: string) => {
        const deleteCheck = confirm('Are you sure you want to delete this category?');
        if (!deleteCheck) return;
        dispatch(deleteCategory(id))
        dispatch(fetchCategories())
    }

    return (
        <div {...props}>
            {loading && !categories ? <div className="flex justify-center items-center w-full h-full"><PuffLoader /></div> :
                <div>
                    {categories &&
                        <Table >
                            <TableHeader>
                                <TableRow >
                                    <TableHead >Name</TableHead>
                                    <TableHead >Url</TableHead>
                                    <TableHead >Date</TableHead>
                                    <TableHead className="flex justify-end items-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {categories.map((category) => {
                                    return (
                                        <TableRow key={category.id}>
                                            <TableCell className={"font-bold"}>{category.name}</TableCell>
                                            <TableCell >
                                                <Link className=' hover:text-blue-600' href={`/categories/${category.url}`}>
                                                    {category.url}
                                                </Link>
                                            </TableCell>
                                            <TableCell >{format(category.created_at, 'P')}</TableCell>
                                            <TableCell className="text-right flex gap-2 justify-end ">
                                                <Button
                                                    disabled={deleteLoading || loading}
                                                    size={'icon'}
                                                    onClick={() => updateHandler(category.id)}
                                                >
                                                    <FaEdit />
                                                </Button>

                                                <Button
                                                    disabled={deleteLoading || loading}
                                                    size={'icon'}
                                                    variant={'destructive'}
                                                    onClick={() => deleteHandler(category.id)}
                                                >
                                                    <MdOutlineDeleteForever size={20} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    }
                </div>
            }
        </div>
    );
}

export default DashboardCategories;