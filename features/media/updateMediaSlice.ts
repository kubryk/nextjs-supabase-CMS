import { toast as Toast } from "sonner";
import { MediaDataType, MediaType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostgrestError } from '@supabase/supabase-js';
import { updateMediaAction } from "@/actions/Media-Actions";

export interface IUpdateMediaState {
    update: MediaType | null
    loadings: {
        update: boolean
    },
    errors: {
        update: PostgrestError | null
    },
}

const initialState: IUpdateMediaState = {
    update: null,
    loadings: {
        update: false
    },
    errors: {
        update: null
    },
}

export const updateMedia = createAsyncThunk(
    'updateMediaData',
    async ({ data, mediaId }: { data: MediaDataType, mediaId: string }) => {
        return await updateMediaAction(data, mediaId)
    },
)

export const updateMediaSlice = createSlice({
    name: 'updateMedia',
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder.addCase(updateMedia.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, update: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Media updating. Loading...')
        })

        builder.addCase(updateMedia.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, update: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, update: false }
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.update = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, update: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Media successfully updated!')
        })

        builder.addCase(updateMedia.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, update: false }
        })
    },
})

// Action creators are generated for each case reducer function
// export const { setSelectedMedia } = mediaSlice.actions

export default updateMediaSlice.reducer