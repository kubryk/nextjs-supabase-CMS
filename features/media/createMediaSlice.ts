import { toast as Toast } from "sonner";
import { MediaType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createMediaAction, saveMediaLocalyAction } from "@/actions/Media-Actions";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";

export interface MediaState {
    saveMediaLocaly: string | null,
    saveMediaInDb: MediaType | null
    loadings: {
        saveMediaLocaly: boolean
        saveMediaInDb: boolean
    },
    errors: {
        saveMediaLocaly: Error | null
        saveMediaInDb: PostgrestError | null
    }
}

interface AddMediaProps {
    name: string
    uploaded_to: string
    mediaFormData: FormData
}

const initialState: MediaState = {
    saveMediaLocaly: null,
    saveMediaInDb: null,
    loadings: {
        saveMediaLocaly: false,
        saveMediaInDb: false
    },
    errors: {
        saveMediaLocaly: null,
        saveMediaInDb: null
    }
}



export const saveMediaLocaly = createAsyncThunk(
    'saveMediaLocaly',
    async (formData: FormData) => {
        return await saveMediaLocalyAction(formData);
    },
)

export const saveMediaInDb = createAsyncThunk(
    'saveMediaInDb',
    async (mediaData: { name: string, uploaded_to: string }) => {
        return await createMediaAction(mediaData);
    },
)

export const createMediaSlice = createSlice({
    name: 'createMedia',
    initialState,
    reducers: {},

    extraReducers(builder) {

        builder.addCase(saveMediaLocaly.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, saveMediaLocaly: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Media saving localy. Loading...')
        })

        builder.addCase(saveMediaInDb.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, saveMediaInDb: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Media saving in DB. Loading...')
        })




        builder.addCase(saveMediaLocaly.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, saveMediaLocaly: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, saveMediaLocaly: false }
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.message)
                return
            }
            //Записуємо дані з сервера у змінну
            state.saveMediaLocaly = action.payload.result
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, saveMediaLocaly: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Media created localy!')
        })

        builder.addCase(saveMediaInDb.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, saveMediaInDb: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, saveMediaInDb: false }
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }
            //Записуємо дані з сервера у змінну
            state.saveMediaInDb = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, saveMediaInDb: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Media created in DB!')
        })

        builder.addCase(saveMediaLocaly.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, saveMediaLocaly: false }
        })

        builder.addCase(saveMediaInDb.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, saveMediaInDb: false }
        })

    },
})

// Action creators are generated for each case reducer function
// export const { setSelectedMedia } = mediaSlice.actions

export default createMediaSlice.reducer