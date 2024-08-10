'use server'
import { fetchAuthorByAction, fetchAuthorsAction } from "@/actions/Author-Actions";
import Container from "@/components/Container";
import AuthorForm from "@/components/dashboard/authors/AuthorForm";
import DashboardAuthors from "@/components/dashboard/authors/Authors";
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

    if (searchParams.action === 'create') {
        return <div>create author</div>
    }

    if (searchParams.id && searchParams.action === 'update') {
        const author = await fetchAuthorByAction('id', searchParams.id);
        if (!author.data) return <div>Author not found</div>

        return <AuthorForm author={author.data} />
    }

    return (
        <>
            <DashboardAuthors />
        </>
    );
}

export default Authors;