import React from 'react';
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
import { fetchAuthorsAction } from '@/actions/Author-Actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';


const DashboardAuthors = async () => {
    const authors = await fetchAuthorsAction();

    return (
        <Container>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Url</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {authors.data && authors.data.map((author) => {
                        return (
                            <TableRow key={author.id}>
                                <TableCell className="font-medium">{author.name}</TableCell>
                                <TableCell>{author.url}</TableCell>
                                <TableCell>{format(author.created_at, 'PP')}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/control-panel/authors?id=${author.id}&action=update`}>Update</Link>
                                    <Button variant={'destructive'}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Container>
    );
};

export default DashboardAuthors;