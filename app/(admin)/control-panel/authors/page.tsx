'use server'
import { fetchAuthorByAction, fetchAuthorsAction } from "@/actions/Author-Actions";
import Container from "@/components/Container";
import AuthorForm from "@/components/control-panel/authors/AuthorForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import Link from "next/link";


const Authors = async ({ searchParams }: { searchParams: { id?: string, action?: 'create' | 'update' } }) => {
    const authors = await fetchAuthorsAction();

    // if(searchParams.id){
    //     if (searchParams.action === 'update') {
    //         const author = await fetchAuthorByAction('id', searchParams.id)


    //     }
    //     if (searchParams.action === 'create') {}


    // }

    if (searchParams.action === 'create') {
        return <div>create author</div>
    }

    if (searchParams.id && searchParams.action === 'update') {
        const author = await fetchAuthorByAction('id', searchParams.id)
        if (!author.data) return <div>Author not found</div>

        return <AuthorForm author={author.data} />
    }

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
}

export default Authors;