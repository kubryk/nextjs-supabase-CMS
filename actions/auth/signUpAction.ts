"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { UserCredentialType } from "@/types/global";

const signUp = async ({ email, password }: UserCredentialType) => {
    const origin = headers().get("origin");
    const supabase = createClient();

    const result = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (result.error) return result.error.message
    return "Check email to continue sign in process"
};

export default signUp;