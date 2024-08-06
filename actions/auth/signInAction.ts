"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserCredentialType } from "@/types/global";


const signIn = async ({email, password}: UserCredentialType) => {
    const supabase = createClient();
    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return error.message;
    return redirect("/control-panel");
};

export default signIn