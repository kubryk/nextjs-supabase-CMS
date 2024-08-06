import { toast as Toast } from "sonner";
import { MediaType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import { deleteMediaFromDbAction, deleteMediaLocalyAction } from "@/actions/Media-Actions";

export interface DeleteMediaState {
    deleteFromDb: PostgrestSingleResponse<null> | null
    deleteFromServer: any
    loadings: {
        deleteFromDb: boolean
        deleteFromServer: boolean
    },
    errors: {
        deleteFromDb: PostgrestError | null
        deleteFromServer: string | null
    }
}

const initialState: DeleteMediaState = {
    deleteFromDb: null,
    deleteFromServer: null,
    loadings: {
        deleteFromDb: false,
        deleteFromServer: false
    },
    errors: {
        deleteFromDb: null,
        deleteFromServer: null
    }
}


export const deleteMediaFromDb = createAsyncThunk(
    'deleteMediaFromDb',
    async (mediaId: string) => {
        return await deleteMediaFromDbAction(mediaId)
    },
)

export const deleteMediaFromServer = createAsyncThunk(
    'deleteMediaFromServer',
    async (path: string) => {
        return await deleteMediaLocalyAction(path)
    },
)

export const deleteMediaSlice = createSlice({
    name: 'deleteMedia',
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder.addCase(deleteMediaFromDb.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, deleteFromDb: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Loading deleting from DB...')
        })

        builder.addCase(deleteMediaFromServer.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, deleteFromServer: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Loading deleting from server...')
        })






        builder.addCase(deleteMediaFromDb.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, deleteFromDb: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, deleteFromDb: false }
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.deleteFromDb = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, deleteFromDb: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Media deleted from DB!')
        })





        builder.addCase(deleteMediaFromServer.fulfilled, (state, action) => {
            // if (action.payload.error) {
            //     //Зберігаємо помилку в змінну
            //     state.errors = { ...state.errors, deleteFromServer: action.payload.error }
            //     //Виключаємо завантаження
            //     state.loadings = { ...state.loadings, deleteFromServer: false }
            //     //Закриваємо повідомлення завантаження
            //     Toast.dismiss()
            //     // //Показуємо помилку
            //     // Toast.error(action.payload.error.details)
            //     return
            // }

            // //Записуємо дані з сервера у змінну
            // state.deleteFromDb = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, deleteFromServer: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Media deleted from server!')
        })
    },

})

// Action creators are generated for each case reducer function
// export const { setSelectedMedia } = mediaSlice.actions

export default deleteMediaSlice.reducer