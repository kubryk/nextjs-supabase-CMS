'use server'
import CreatePost from "@/components/dashboard/posts/CreatePostForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";



export default async function CreatePostPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect("/login");


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div>
                <CreatePost />
            </div>
        </div>
    );
}
