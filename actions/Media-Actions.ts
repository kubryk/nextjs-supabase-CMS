'use server'
import useSupabase from '@/hooks/useSupabase';
import { MediaDataType, MediaType } from '@/types/global';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
// import fs from "node:fs/promises";
import fs from 'fs'

export const saveMediaLocalyAction = async (mediaFormData: FormData) => {
    try {
        const file = mediaFormData.get('media') as File;
        //ПОМИЛКА якщо в форм даті немає файлів
        if (!file) throw new Error('Media not found')

        //Визначаємо теперішній рік та місяць для створення назв папок
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        //перевіряємо чи папки вже існують
        const isYearFolderExist = fs.existsSync(`./public/media/${year}`);
        const isMonthFolderExist = fs.existsSync(`./public/media/${year}/${month}`);

        //Some shit with images
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        //Створюємо папку з роком якщо не існує
        if (!isYearFolderExist) fs.mkdirSync(`./public/media/${year}`);
        //Створюємо папку з місяцем якщо не існує
        if (!isMonthFolderExist) fs.mkdirSync(`./public/media/${year}/${month}`);

        //Записуємо файл в папку
        fs.writeFile(`./public/media/${year}/${month}/${file.name}`,
            buffer,
            (error) => {
                //ПОМИЛКА якщо файл не створено
                if (error) throw new Error('Error creating file')
                console.log(`${file.name} SAVED`);
            }
        );
        return {
            error: null,
            result: file.name
        }
    } catch (error: any) {
        console.log(error.message)
        return {
            error,
            result: null
        }
    }
}

export const deleteMediaLocalyAction = async (path: string) => {
    fs.unlink(path, (err) => console.log(err))
}



export const createMediaAction = async (media: { name: string, uploaded_to: string }): Promise<PostgrestSingleResponse<MediaType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<MediaType> = await supabase
        .from('media')
        .insert({ ...media })
        .select()
        .limit(1)
        .single();
    return result
}

export const deleteMediaFromDbAction = async (mediaId: string): Promise<PostgrestSingleResponse<null>> => {
    const supabase = useSupabase();
    const result = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);
    return result;
}



export const updateMediaAction = async (data: MediaDataType, mediaId: string): Promise<PostgrestSingleResponse<MediaType>> => {
    console.log(data)
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<MediaType> = await supabase
        .from('media')
        .update({ ...data })
        .eq('id', mediaId)
        .single();
    console.log(result)
    return result;
}

export const fetchMediasAction = async (): Promise<PostgrestSingleResponse<MediaType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<MediaType[]> = await supabase
        .from('media')
        .select()
        .order('created_at', { ascending: false });
    return result
}

export const fetchSingleMediaByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<MediaType>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<MediaType> = await supabase
        .from('media')
        .select()
        .eq(column, value)
        .limit(1)
        .single();
    return result;
}

export const fetchMediaByAction = async (column: string, value: string): Promise<PostgrestSingleResponse<MediaType[]>> => {
    const supabase = useSupabase();
    const result: PostgrestSingleResponse<MediaType[]> = await supabase
        .from('media')
        .select()
        .eq(column, value)
    return result;
}

