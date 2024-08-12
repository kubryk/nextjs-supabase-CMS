import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardCategories from "@/components/dashboard/categories/Categories";

const CategoriesPage = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div>
                <DashboardCategories />
            </div>
        </div>

    );
}

export default CategoriesPage;