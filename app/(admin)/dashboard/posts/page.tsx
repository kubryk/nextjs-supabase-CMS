
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardPosts from "@/components/dashboard/posts/Posts";


export default async function ControlPanelPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div>
                <DashboardPosts />
            </div>
        </div>
    );
}
