
import AuthButton from "@/components/auth/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import CPPosts from "@/components/control-panel/posts/CP-Posts";
import CPNavigation from "@/components/control-panel/CP-Navigation";


export default async function ControlPanelPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();


    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div>
                <CPPosts />
            </div>
        </div>
    );
}
