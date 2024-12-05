import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardCategories from "@/components/dashboard/categories/Categories";
import CategoryForm from "@/components/dashboard/categories/CategoryForm";

const CategoriesPage = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex w-full h-full p-4 gap-4">
            <DashboardCategories className=" border-[2px] w-full border-gray-200 rounded-lg" />
            <CategoryForm action='create' className=" min-w-[250px] h-[300px] border-[2px] border-gray-200 p-3" />
        </div>
    );
}

export default CategoriesPage;