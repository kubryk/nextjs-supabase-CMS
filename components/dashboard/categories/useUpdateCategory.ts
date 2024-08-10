import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { categoryFormSchema, postFormSchema } from "@/schemas/formSchemas";
import { CategoryDataType, PostCategoryType, PostDataType, PostType } from "@/types/global";
import useServerAction from "../../../hooks/useServerAction";
import { useEffect } from "react";
import { fetchCategoryByIdAction, updateCategoryAction } from "@/actions/Category-Actions";

const useUpdateCategory = (categoryId: string) => {
    const router = useRouter();
    const updateCategory = useServerAction<PostCategoryType[], any>({
        action: updateCategoryAction,
        toast: true,
        successMessage: 'Category has been updated',
        loadingMessage: 'Loading updating category...'
    });

    const category = useServerAction<PostCategoryType[], any>({
        action: fetchCategoryByIdAction
    })

    useEffect(() => {
        category.useAction({ categoryId })
    }, [])

    useEffect(() => {
        if (category.data) {
            form.reset({
                name: category.data[0].name,
                url: category.data[0].url,
            })
        }
    }, [category.data])


    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        mode: "onChange",
    });


    const onSubmit = async (data: CategoryDataType) => {
        await updateCategory.useAction({ data, categoryId });
    };
    return { form, onSubmit, updateCategory, category };
};

export default useUpdateCategory;
