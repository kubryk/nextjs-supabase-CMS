'use client'
import { HTMLAttributes, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Container from '@/components/Container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchAuthors } from '@/features/authors/fetchAuthorsSlice';
import { PuffLoader } from 'react-spinners';
import { cn } from '@/lib/utils';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteAuthor } from '@/features/authors/deleteAuthorSlice';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';


const DashboardAuthors = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { authors, loading } = useAppSelector(state => state.fetchAuthors);
    const { deleteLoading } = useAppSelector(state => state.deleteAuthors);


    useEffect(() => {
        dispatch(fetchAuthors())
    }, [])

    const updateHandler = (id: string) => {
        router.push(`/dashboard/authors/update?id=${id}`)
    }
    const deleteHandler = (id: string) => {
        dispatch(deleteAuthor(id))
        dispatch(fetchAuthors())
    }

    if (authors && authors.length === 0) return <div className="text-center">No authors found</div>

    return (
        <>
            {loading ? <PuffLoader className=' mx-auto my-auto' /> :
                <div {...rest} className={cn('border-[2px] border-gray-200', className)}>
                    {authors && authors.length &&
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Url</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {authors && authors.map((author) => {
                                        return (
                                            <TableRow key={author.id}>
                                                <TableCell className="font-medium">{author.name}</TableCell>
                                                <TableCell>{author.url}</TableCell>
                                                <TableCell>{format(author.created_at, 'PP')}</TableCell>
                                                <TableCell className="text-right flex justify-end gap-2">
                                                    <Button
                                                        size={'icon'}
                                                        onClick={() => updateHandler(author.id)}
                                                    >
                                                        {deleteLoading || loading ? <PuffLoader color="white" size={25} /> : <FaEdit />}
                                                    </Button>

                                                    <Button
                                                        disabled={deleteLoading}
                                                        size={'icon'}
                                                        variant={'destructive'}
                                                        onClick={() => deleteHandler(author.id)}
                                                    >
                                                        {deleteLoading || loading ? <PuffLoader size={25} /> : <MdOutlineDeleteForever size={20} />}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default DashboardAuthors;
