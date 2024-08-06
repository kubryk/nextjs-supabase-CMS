
import CreateCategoryForm from "@/components/control-panel/categories/CP-CreateCategoryForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const CreateCategoryPage = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }


    return ( 
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div>
                <CreateCategoryForm />
            </div>
        </div>
    );
}

export default CreateCategoryPage;