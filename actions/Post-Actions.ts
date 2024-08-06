'use server'
import useSupabase from '@/hooks/useSupabase'
import { PostCategoryType, PostDataType, PostType } from '@/types/global';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export interface UpdatePostActionProps {
    data: PostDataType
    postId: string
}

export interface IFetchPageOfPostsBy {
    pageOptions: {
        currentPage: number
        pageSize: number
    }
    columnOptions: {
        column: string
        equal: string
    }
    category?: string
}

export interface IFetchPageOfCategoryPostsBy extends IFetchPageOfPostsBy {
    category: string
}



//Створити пост
export const createSinglePostAction = async (data: PostDataType): Promise<PostgrestSingleResponse<PostType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType> = await supabase
        .from('posts')
        .insert(data)
        .select()
        .limit(1)
        .single()
    return result;
}

//Видалити пост
export const deleteSinglePostAction = async (postId: string): Promise<PostgrestSingleResponse<null>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<null> = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
    // .select()
    // .limit(1)
    // .single();
    console.log(result)
    return result;
}

//Редагувати пост
export const updateSinglePostAction = async ({ data, postId }: UpdatePostActionProps): Promise<PostgrestSingleResponse<PostType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType> = await supabase
        .from('posts')
        .update({ ...data })
        .eq('id', postId)
        .select()
        .single();
    return result;
}

//Всі пости
export const fetchPostsAction = async (): Promise<PostgrestSingleResponse<PostType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType[]> = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false });
    return result;
}

//Всі пости по критерію
export const fetchPostsByAction = async (column: string, equal: string): Promise<PostgrestSingleResponse<PostType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType[]> = await supabase
        .from('posts')
        .select()
        .eq(column, equal)
        .order('created_at', { ascending: false });
    return result;
}

//Один пост
export const fetchSinglePostAction = async (): Promise<PostgrestSingleResponse<PostType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType> = await supabase
        .from('posts')
        .select()
        .limit(1)
        .single();
    return result;
}

//Один пост по критерію
export const fetchSinglePostByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<PostType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<PostType> = await supabase
        .from('posts')
        .select()
        .eq(column, value)
        .limit(1)
        .single();
    return result;
}

//Сторінка постів
export const fetchPageOfPostsAction = async (currentPage: number, pageSize: number): Promise<PostgrestSingleResponse<PostType[]>> => {
    const supabase = useSupabase();
    let firstPostOnPage = ((currentPage * pageSize) - pageSize);
    let lastPostOnPage = firstPostOnPage + pageSize - 1;

    const result: PostgrestSingleResponse<PostType[]> = await supabase
        .from('posts')
        .select()
        .range(firstPostOnPage, lastPostOnPage)
        .order('created_at', { ascending: false });
    return result;
}


//Сторінка постів по критерію
export const fetchPageOfPostsByAction = async ({ pageOptions, columnOptions }: IFetchPageOfPostsBy): Promise<PostgrestSingleResponse<PostType[]>> => {
    const supabase = useSupabase();
    let firstPostOnPage = ((pageOptions.currentPage * pageOptions.pageSize) - pageOptions.pageSize);
    let lastPostOnPage = firstPostOnPage + pageOptions.pageSize - 1;

    const result: PostgrestSingleResponse<PostType[]> = await supabase
        .from('posts')
        .select()
        .eq(columnOptions.column, columnOptions.equal)
        .range(firstPostOnPage, lastPostOnPage)
        .order('created_at', { ascending: false });
    return result;
}

//Сторінка постів категорії по критерію
export const fetchPageOfCategoryPostsByAction = async ({ pageOptions, columnOptions, category }: IFetchPageOfCategoryPostsBy): Promise<PostgrestSingleResponse<PostType[]>> => {
    const supabase = useSupabase();
    let firstPostOnPage = ((pageOptions.currentPage * pageOptions.pageSize) - pageOptions.pageSize);
    let lastPostOnPage = firstPostOnPage + pageOptions.pageSize - 1;

    const result: PostgrestSingleResponse<PostType[]> = await supabase
        .from('posts')
        .select()
        .eq('category', category)
        .eq(columnOptions.column, columnOptions.equal)
        .range(firstPostOnPage, lastPostOnPage)
        .order('created_at', { ascending: false });
    return result;
}









// export interface UpdatePostActionProps {
//     data: PostDataType
//     postId: string
// }


// //Всі пости
// export const fetchPostsAction = async (): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .select()
//         .order('created_at', { ascending: false });
//     return result;
// }

// //Пости за статусом
// export const fetchPostsByStatusAction = async (status: string): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .select()
//         .eq('status', status)
//         .order('created_at', { ascending: false });
//     return result;
// }

// //Всі пости для 1 сторінки
// export const fetchPostsForPageAction = async (currentPage: number, pageSize: number): Promise<PostgrestSingleResponse<PostType[]>> => {
//     let firstPostOnPage = ((currentPage * pageSize) - pageSize);
//     let lastPostOnPage = firstPostOnPage + pageSize - 1;

//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .select()
//         .range(firstPostOnPage, lastPostOnPage)
//         .order('created_at', { ascending: false });
//     return result;
// }

// //Всі пости для 1 сторінки по статусу
// export const fetchPostsForPageByStatusAction = async (currentPage: number, pageSize: number, status: string): Promise<PostgrestSingleResponse<PostType[]>> => {
//     let firstPostOnPage = ((currentPage * pageSize) - pageSize);
//     let lastPostOnPage = firstPostOnPage + pageSize - 1;

//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .select()
//         .eq('status', status)
//         .range(firstPostOnPage, lastPostOnPage)
//         .order('created_at', { ascending: false });
//     return result;
// }







// export const addPosttAction = async (data: PostDataType): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .insert(data)
//         .select();
//     return result;
// }

// export interface IDeletePostActionProps {
//     postId: string
// }

// export const deletePostAction = async (data: IDeletePostActionProps): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .delete().
//         eq('id', data.postId)
//         .select();
//     revalidatePath('/');
//     return result;
// }

// export const updatePostsAction = async ({ data, postId }: UpdatePostActionProps): Promise<PostgrestSingleResponse<null>> => {
//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .update({ ...data })
//         .eq('id', postId);
//     return result;
// }

// export const fetchPostsByIdAction = async (data: { postId: string }): Promise<PostgrestSingleResponse<PostType>> => {
//     const supabase = useSupabase();
//     const result: PostgrestSingleResponse<PostType> = await supabase
//         .from('posts')
//         .select()
//         .eq('id', data.postId)
//         .limit(1)
//         .single();
//     return result;
// }

// export const fetchPostsByUrl = async (data: { postUrl: string }): Promise<PostgrestSingleResponse<PostType>> => {
//     const supabase = useSupabase();
//     const result: PostgrestSingleResponse<PostType> = await supabase
//         .from('posts')
//         .select()
//         .eq('url', data.postUrl)
//         .limit(1)
//         .single();
//     return result;
// }

// export const fetchPostsByCategoryAction = async (categotyUrl: string): Promise<PostgrestSingleResponse<PostCategoryType[]>> => {
//     const supabase = useSupabase();

//     const result = await supabase
//         .from('posts')
//         .select()
//         .eq('category', categotyUrl);
//     return result;
// }

// export const fetchPostsByCategoryIdAction = async (data: { categoryId: string }): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const supabase = useSupabase();

//     const result = await supabase
//         .from('posts')
//         .select()
//         .eq('category', data.categoryId)
//         .order('created_at', { ascending: false });;
//     return result;
// }

// export const fetchPostsRangeByCategoryIdAction = async (currentPage: number, categoryId: string): Promise<PostgrestSingleResponse<PostType[]>> => {
//     const pageSize = 6;
//     let firstPostOnPage = ((currentPage * pageSize) - pageSize);
//     let lastPostOnPage = firstPostOnPage + pageSize - 1;

//     const supabase = useSupabase();
//     const result = await supabase
//         .from('posts')
//         .select()
//         .eq('category', categoryId)
//         .range(firstPostOnPage, lastPostOnPage)
//         .order('created_at', { ascending: false });
//     return result;
// }