
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardPosts from "@/components/dashboard/posts/Posts";
import StoreProvider from "@/providers/StoreProvider";
import { Card } from "@/components/ui/card";


export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <StoreProvider>
            <div className="p-4">
                <DashboardPosts className=" border-[1px] border-gray-200 h-full" />
            </div>
        </StoreProvider>
    );
}
