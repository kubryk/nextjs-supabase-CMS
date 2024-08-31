import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { redirect } from "next/navigation";

const DashboardHeader = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";
        const supabase = createClient();
        await supabase.auth.signOut();
        redirect("/login");
    };
    return (
        <div className="px-4 min-w-full h-[50px] bg-indigo-100 flex items-center justify-end">
            {user &&
                <form className="flex gap-3 justify-center items-center" action={signOut}>
                    <span className=" text-sm">{user.email}</span>
                    {/* {user.last_sign_in_at && <div className=" text-[10px]">{format(user.last_sign_in_at, 'PPp')}</div>} */}
                    <button className=" text-rose-800 font-semibold text-sm">
                        Logout
                    </button>
                </form>
            }

        </div>
    )
}

export default DashboardHeader;