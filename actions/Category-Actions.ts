'use server'
import useSupabase from '@/hooks/useSupabase'
import { CategoryDataType, PostCategoryType } from '@/types/global';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { clear } from 'console';




export const fetchCategoriesAction = async (): Promise<PostgrestSingleResponse<PostCategoryType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostCategoryType[]> = await supabase
        .from('categories')
        .select();
    return result;
}

export const fetchCategoriesByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<PostCategoryType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostCategoryType[]> = await supabase
        .from('categories')
        .select()
        .eq(column, value)
    return result;
}

export const fetchSingleCategoryByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<PostCategoryType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostCategoryType> = await supabase
        .from('categories')
        .select()
        .eq(column, value)
        .limit(1)
        .single();
    return result;
}

export const createCategoryAction = async (data: CategoryDataType): Promise<PostgrestSingleResponse<PostCategoryType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostCategoryType> = await supabase
        .from('categories')
        .insert(data)
        .select()
        .limit(1)
        .single();
    return result;
}

export const deleteCategoryAction = async (categoryId: string): Promise<PostgrestSingleResponse<null>> => {
    const supabase = useSupabase();
    const result = await supabase
        .from('categories')
        .delete().
        eq('id', categoryId);
    return result;
}


export const updateCategoryAction = async (data: CategoryDataType, categoryId: string): Promise<PostgrestSingleResponse<PostCategoryType>> => {
    const supabase = useSupabase();
    const result = await supabase
        .from('categories')
        .update({ ...data })
        .eq('id', categoryId)
        .select()
        .single();
    console.log(result)
    return result;
}






// export const fetchCategoriesAction = async (): Promise<PostgrestSingleResponse<PostCategoryType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('categories')
//         .select();
//     return result;
// }

// export const addCategoryAction = async (data: CategoryDataType): Promise<PostgrestSingleResponse<PostCategoryType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('categories')
//         .insert(data)
//         .select();
//     return result;
// }

// export const deleteCategoryAction = async (data: { categoryId: string }): Promise<PostgrestSingleResponse<null>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('categories')
//         .delete().
//         eq('id', data.categoryId);
//     return result;
// }

// interface UpdateCategoryActionProps {
//     data: CategoryDataType
//     categoryId: string
// }

// export const updateCategoryAction = async ({ data, categoryId }: UpdateCategoryActionProps): Promise<PostgrestSingleResponse<null>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('categories')
//         .update({ ...data })
//         .eq('id', categoryId);
//     return result;
// }


// export const fetchCategoryByIdAction = async (data: { categoryId: string }): Promise<PostgrestSingleResponse<PostCategoryType>> => {
//     const supabase = useSupabase();
//     const result: PostgrestSingleResponse<PostCategoryType> = await supabase
//         .from('categories')
//         .select()
//         .eq('id', data.categoryId)
//         .limit(1)
//         .single();
//     return result;
// }

// export const fetchCategoryByUrlAction = async (categoryUrl: string): Promise<PostgrestSingleResponse<PostCategoryType>> => {
//     const supabase = useSupabase();

//     const result: PostgrestSingleResponse<PostCategoryType> = await supabase
//         .from('categories')
//         .select()
//         .eq('url', categoryUrl)
//         .limit(1)
//         .single();
//     return result;
// }
