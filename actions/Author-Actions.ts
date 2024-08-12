'use server'
import useSupabase from '@/hooks/useSupabase'
import { AuthorDataType, AuthorsType } from '@/types/global';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { clear } from 'console';

//Fetch all authors
export const fetchAuthorsAction = async (): Promise<PostgrestSingleResponse<AuthorsType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType[]> = await supabase
        .from('authors')
        .select();
    return result;
}

//Fetch single author by column name
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

//Update author
export const updateAuthorAction = async (id: string, data: AuthorDataType): Promise<PostgrestSingleResponse<AuthorsType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType> = await supabase
        .from('authors')
        .update(data)
        .eq('id', id)
        .single();
    return result;
}

//Create author
export const createSingleAuthorAction = async (data: AuthorDataType): Promise<PostgrestSingleResponse<AuthorsType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<AuthorsType> = await supabase
        .from('authors')
        .insert(data)
        .select()
        .limit(1)
        .single()
    return result;
}

//Delete author
export const deleteSingleAuthorAction = async (authorId: string): Promise<PostgrestSingleResponse<null>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<null> = await supabase
        .from('auhotrs')
        .delete()
        .eq('id', authorId)
    return result;
}





