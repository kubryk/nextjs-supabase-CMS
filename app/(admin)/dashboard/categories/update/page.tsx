
import UpdateCategoryForm from "@/components/dashboard/categories/UpdateCategoryForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const UpdateCategoryPage = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }


    return (
        <>
            <UpdateCategoryForm />
        </>
    );
}

export default UpdateCategoryPage;