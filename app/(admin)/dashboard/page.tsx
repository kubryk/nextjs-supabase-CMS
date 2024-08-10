
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MediaProvider from "@/providers/MediaProvider";
import MediaGalery from "@/components/dashboard/media-galery/MediaGalery";
import RichEditor from "@/components/dashboard/media-galery/rich-editor/RichEditor";
import NestedForm from "@/tests/nestedForm";
import ShortCodes from "@/tests/shortcodes";


export default async function ControlPanelPage({ searchParams }: { searchParams: { id: string } }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {/* <NestedForm /> */}
      <ShortCodes />
    </div>
  );
}
