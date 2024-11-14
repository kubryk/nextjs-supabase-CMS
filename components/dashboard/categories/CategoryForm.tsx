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
import useCategoryForm from "../../../hooks/forms/useCategoryForm";
import { FormHTMLAttributes } from "react";
import { PuffLoader } from "react-spinners";

interface CategoryFormProps extends FormHTMLAttributes<HTMLDivElement> {
    action: 'create' | 'update';
    categoryId?: string;
}

const CategoryForm = ({ action, categoryId, ...rest }: CategoryFormProps) => {
    const { form, onSubmit, error, loading, result } = useCategoryForm({ action, categoryId });

    return (
        <div {...rest}>
            {loading ? <div className="flex justify-center items-center h-full w-full"><PuffLoader /></div> :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col items-center gap-3">
                        <h3 className="text-xl font-bold">{action === 'update' ? "Update Category" : "New Category"}</h3>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{action === 'update' ? 'Update' : 'Create'}</Button>
                    </form>
                </Form>}
        </div>
    );
}

export default CategoryForm;