'use server'
import useSupabase from '@/hooks/useSupabase'
import { AuthorDataType, AuthorsType } from '@/types/global';
import { PostgrestSingleResponse } from '@supabase/supabase-js';


export const fetchAuthorsAction = async (): Promise<PostgrestSingleResponse<AuthorsType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType[]> = await supabase
        .from('authors')
        .select();
    return result;
}

export const fetchAuthorByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<AuthorsType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType> = await supabase
        .from('authors')
        .select()
        .eq(column, value)
        .limit(1)
        .single();
    return result;
}

export const updateAuthorAction = async (id: string, data: AuthorDataType): Promise<PostgrestSingleResponse<AuthorsType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType> = await supabase
        .from('authors')
        .update(data)
        .eq('id', id)
        .single();
    return result;
}





