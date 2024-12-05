
import CategoryForm from "@/components/dashboard/categories/CategoryForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const CreateCategoryPage = ({ searchParams }: { searchParams: { id: string } }) => {
    if (!searchParams.id) {
        redirect('/dashboard/categories')
    }

    return (
        <div className="flex flex-col w-full h-full justify-start items-center p-4">
            <Link className=" flex gap-1 items-center w-full justify-start" href="/dashboard/categories">
                <IoChevronBack size={30} />
                <span>Back</span>
            </Link>

            <CategoryForm className="border-[2px] border-gray-200 p-10" action="update" categoryId={searchParams.id} />
        </div>
    );
}

export default CreateCategoryPage;