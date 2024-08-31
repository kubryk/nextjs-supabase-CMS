import AuthorForm from "@/components/dashboard/authors/AuthorForm";
import StoreProvider from "@/providers/StoreProvider";

export default async function UpdateAuthorPage({ searchParams }: { searchParams: { id: string } }) {
    return (
        <StoreProvider >
            <div className="p-3 h-full">
                <AuthorForm
                    authorId={searchParams.id}
                    action='update'
                    className=" h-full"
                />
            </div>
        </StoreProvider>
    );
}

