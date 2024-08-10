import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { categoryFormSchema, postFormSchema } from "@/schemas/formSchemas";
import { CategoryDataType, PostCategoryType, PostDataType, PostType } from "@/types/global";
import useServerAction from "../../../hooks/useServerAction";
import { useEffect } from "react";
import { createCategoryAction } from "@/actions/Category-Actions";

const useAddCategoryForm = () => {
    const router = useRouter();

    const { data, useAction, isLoading, errorMessage } = useServerAction<PostCategoryType[], CategoryDataType>({
        action: createCategoryAction,
        toast: true,
        successMessage: 'Category has been created',
        loadingMessage: 'Loading creating category...'
    });

    // useEffect(() => {
    //     if (data) router.push(`/control-panel/posts/update?id=${data[0].id}`);
    // }, [data])




    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "NewCategory",
            url: "new-category"
        },
        mode: "onChange",
    });


    const onSubmit = async (data: CategoryDataType) => {
        await useAction(data);
    };
    return { form, onSubmit, errorMessage, isLoading };
};

export default useAddCategoryForm;
