'use server'
import { fetchAuthorByAction } from "@/actions/Author-Actions";
import AuthorForm from "@/components/dashboard/authors/AuthorForm";
import DashboardAuthors from "@/components/dashboard/authors/Authors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import StoreProvider from "@/providers/StoreProvider";


const Authors = async ({ searchParams }: { searchParams: { id?: string, action?: 'create' | 'update' } }) => {

    // if (searchParams.id && searchParams.action === 'update') {
    //     return (
    //         <StoreProvider>
    //             <AuthorForm authorId={searchParams.id} action='update' />
    //         </StoreProvider>
    //     )
    // }

    // if (searchParams.action === 'create') {
    //     return (
    //         <StoreProvider>
    //             <AuthorForm action='create' />
    //         </StoreProvider>
    //     )
    // }

    return (
        <StoreProvider>
            <div className=" flex gap-5 w-full h-full p-3">
                <DashboardAuthors className="w-full " />
                <AuthorForm action='create' className="w-[300px] " />
            </div>
        </StoreProvider>
    )
}

export default Authors;