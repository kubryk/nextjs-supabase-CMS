'use client'
import { Button } from "@/components/ui/button";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { createPortal } from "react-dom";

function NestedForm() {


    // const reference = useRef<HTMLDivElement | null>(null)
    // const formOne = useForm({
    //     defaultValues: {
    //         login: 'skstalker',
    //     }
    // });

    // const { handleSubmit: handleSubmitTwo, control: controlTwo, ...rest } = useForm({
    //     defaultValues: {
    //         secret: '123456'
    //     }
    // })

    const onSubmit = (data: any) => {
        console.log('Submit form 1')
    }

    const onSubmitTwo = (data: any) => {
        console.log('Submit form 2')
    }

    // Wrap the hook in a function
    const registerForm = () => {
        const form = useForm();
        return form
    }

    // Register multiple forms
    const forms = {
        login: registerForm(),
        secret: registerForm(),
    }


    return (
        <div>
            <Form {...forms.login}>
                <form onSubmit={forms.login.handleSubmit(onSubmit)} className="space-y-8">



                    <Dialog>
                        <DialogTrigger>Open Form 2</DialogTrigger>
                        {/* {reference.current && createPortal( */}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    <Form {...forms.secret} >
                                        <form onSubmit={forms.secret.handleSubmit(onSubmitTwo)} className="space-y-8">
                                            <FormField
                                                control={forms.secret.control}
                                                name="secret"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your public display password.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </Form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                        {/* ,
                            reference.current
                        )} */}
                    </Dialog>



                    <FormField
                        control={forms.login.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>login</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    )
}

export default NestedForm;

