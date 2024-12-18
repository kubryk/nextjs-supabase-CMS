'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UpdatePostForm from "@/components/control-panel/posts/CP-UpdatePostForm";
import StoreProvider from "@/providers/StoreProvider";

export default async function EditPostPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }


    return (
        // <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div>
            <StoreProvider>
                <UpdatePostForm />
            </StoreProvider>
        </div>
    );
}
