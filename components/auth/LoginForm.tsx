'use client'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import signIn from "@/actions/auth/signInAction";
import { useState } from "react";
import { UserCredentialType } from "@/types/global";
import useLogin from "@/hooks/useAuthForm";

const LoginForm = () => {
    const {form, onSubmitSignIn, onSubmitSignUp, error} = useLogin();

    return (
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={'password'} {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button onClick={form.handleSubmit(onSubmitSignIn)} className=" w-[100%] bg-green-700" type="submit">SignIn</Button>
                <Button onClick={form.handleSubmit(onSubmitSignUp)} className=" w-[100%]" type="submit">SignUp</Button>
            </form>
            {error && <p className=" text-red-600">{error}</p>}
        </Form>

    );
}

export default LoginForm;