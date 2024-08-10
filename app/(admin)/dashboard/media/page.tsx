import MediaGalery from "@/components/dashboard/media-galery/MediaGalery";
import StoreProvider from "@/providers/StoreProvider";
import { store } from "@/store/store";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "react-redux";


export default async function MediaPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect("/login");


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <StoreProvider>
                <MediaGalery />
            </StoreProvider>
        </div>
    );
}
