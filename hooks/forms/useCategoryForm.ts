import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { categoryFormSchema } from "@/schemas/formSchemas";
import { CategoryDataType } from "@/types/global";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createCategory } from "@/features/category/createCategorySlice";
import { fetchCategories } from "@/features/category/fetchCategoriesSlice";
import { useEffect } from "react";
import { fetchUpdatingCategory, updateCategory } from "@/features/category/updateCategorySlice";

interface AddCategoryFormProps {
    action?: 'create' | 'update';
    categoryId?: string;
}

const useCategoryForm = ({ action, categoryId }: AddCategoryFormProps) => {
    const dispatch = useAppDispatch();
    const {
        result,
        loading,
        error
    } = useAppSelector(state => state.createCategory);
    const {
        results,
        loadings,
        errors
    } = useAppSelector(state => state.updateCategory);

    useEffect(() => {
        form.reset({ name: '', url: '' });
        if (categoryId && action === 'update') {
            dispatch(fetchUpdatingCategory(categoryId));
        }
    }, [])


    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        values: results.fetch ? {
            name: results.fetch.name,
            url: results.fetch.url,
        } : {
            name: '',
            url: '',
        },
        mode: "onChange",
    });


    const onSubmit = async (data: CategoryDataType) => {
        if (action === 'update' && categoryId) {
            dispatch(updateCategory({ id: categoryId, data }));
            return
        }
        dispatch(createCategory(data));
        dispatch(fetchCategories());
        form.reset({ name: '', url: '' });
    };

    return { form, onSubmit, error, loading, result };
};

export default useCategoryForm;
