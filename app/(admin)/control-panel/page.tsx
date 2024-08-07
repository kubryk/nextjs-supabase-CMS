
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MediaProvider from "@/providers/MediaProvider";
import MediaGalery from "@/components/control-panel/media-galery/MediaGalery";
import RichEditor from "@/components/control-panel/rich-editor/RichEditor";
import NestedForm from "@/tests/nestedForm";


export default async function ControlPanelPage({ searchParams }: { searchParams: { id: string } }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {/* <MediaProvider>
        <MediaGalery />
      </MediaProvider> */}
      <NestedForm />
    </div>
  );
}
