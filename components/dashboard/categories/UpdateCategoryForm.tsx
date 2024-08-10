'use client'
//Components
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"

//Hooks
import useUpdateCategory from "@/components/dashboard/categories/useUpdateCategory";
import { useSearchParams, useRouter } from "next/navigation";


const UpdateCategoryForm = () => {
    const router = useRouter();
    const categoryId = useSearchParams().get('id');
    //Якщо в посиланні немає ід переадресовуємо на сторінку всіх постів
    if (!categoryId) router.push('/control-panel/posts')

    const { form, onSubmit, updateCategory, category } = useUpdateCategory(categoryId!);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is category name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is category url.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update</Button>
            </form>
        </Form>
    );
}

export default UpdateCategoryForm;