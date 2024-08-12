
import Insights from "@/components/dashboard/DashboardInsights";
import { createClient } from "@/lib/supabase/server";
import StoreProvider from "@/providers/StoreProvider";
import { format } from "date-fns/format";
import { redirect } from "next/navigation";


export default async function Dashboard({ searchParams }: { searchParams: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  return (
    <StoreProvider>
      <div className="flex-1 w-full flex flex-col items-center">
        Welcome {user.email}
        {user.last_sign_in_at && <div>Last login: {format(user.last_sign_in_at, 'PPpp')}</div>}
        <Insights />
      </div>
    </StoreProvider>
  );
}
