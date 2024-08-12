'use server'
import { fetchAuthorByAction } from "@/actions/Author-Actions";
import AuthorForm from "@/components/dashboard/authors/AuthorForm";
import DashboardAuthors from "@/components/dashboard/authors/Authors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import StoreProvider from "@/providers/StoreProvider";


const Authors = async ({ searchParams }: { searchParams: { id?: string, action?: 'create' | 'update' } }) => {

    if (searchParams.id && searchParams.action === 'update') {
        return (
            <StoreProvider>
                <AuthorForm authorId={searchParams.id} action='update' />
            </StoreProvider>
        )
    }

    if (searchParams.action === 'create') {
        return (
            <StoreProvider>
                <AuthorForm action='create' />
            </StoreProvider>
        )
    }

    return (
        <StoreProvider>
            <DashboardAuthors />
        </StoreProvider>
    )
}

export default Authors;