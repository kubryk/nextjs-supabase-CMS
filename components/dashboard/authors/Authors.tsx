'use client'
import { useEffect } from 'react';
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


const DashboardAuthors = () => {
    const dispatch = useAppDispatch();
    const { authors, loading } = useAppSelector(state => state.fetchAuthors);

    useEffect(() => {
        dispatch(fetchAuthors())
    }, [])

    return (
        <Container>
            {loading && <PuffLoader />}
            {authors &&
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
                        {authors.map((author) => {
                            return (
                                <TableRow key={author.id}>
                                    <TableCell className="font-medium">{author.name}</TableCell>
                                    <TableCell>{author.url}</TableCell>
                                    <TableCell>{format(author.created_at, 'PP')}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/dashboard/authors?id=${author.id}&action=update`}>Update</Link>
                                        <Button variant={'destructive'}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </Container>
    );
};

export default DashboardAuthors;