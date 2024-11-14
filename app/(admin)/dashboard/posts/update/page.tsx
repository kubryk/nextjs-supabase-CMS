'use server'
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdatePostForm from "@/components/dashboard/posts/UpdatePostForm";
import StoreProvider from "@/providers/StoreProvider";

export default async function EditPostPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <StoreProvider>
            <UpdatePostForm />
        </StoreProvider>
    );
}
