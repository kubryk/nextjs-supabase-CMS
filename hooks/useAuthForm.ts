import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { UserCredentialType } from "@/types/global";
import signIn from "@/actions/auth/signInAction";
import signUp from "@/actions/auth/signUpAction";
import { authFormSchema } from "@/schemas/formSchemas";

export default function useAuthForm() {
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: 'flock1715@gmail.com',
            password: '123456'
        },
        mode: 'onChange'
    })

    const onSubmitSignIn = async (data: UserCredentialType) => {
        setError(null);
        const errorMessage = await signIn(data);
        if(errorMessage) setError(errorMessage);
    }

    const onSubmitSignUp = async (data: UserCredentialType) => {
        setError(null);
        const errorMessage = await signUp(data);
        if(errorMessage) setError(errorMessage);
    }

    return {form, onSubmitSignIn, onSubmitSignUp, error}

}