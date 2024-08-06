import { toast as Toast } from "sonner";
import { MediaType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostgrestError } from '@supabase/supabase-js';
import { fetchMediaByAction, fetchMediasAction } from "@/actions/Media-Actions";

export interface FetchMediaState {
    mediaGaleryPost: string | undefined
    media: MediaType[] | null
    postMedia: MediaType[] | null
    selectedMedia: MediaType | null
    loadings: {
        media: boolean,
        postMedia: boolean
    },
    errors: {
        media: PostgrestError | null,
        postMedia: PostgrestError | null,
    }
}

const initialState: FetchMediaState = {
    mediaGaleryPost: undefined,
    media: null,
    postMedia: null,
    selectedMedia: null,
    loadings: {
        media: false,
        postMedia: false
    },
    errors: {
        media: null,
        postMedia: null
    },
}

export const fetchAllMedia = createAsyncThunk(
    'fetchAllMedia',
    async () => {
        const fetchingResult = await fetchMediasAction()
        return fetchingResult
    }
)

export const fetchPostMedia = createAsyncThunk(
    'fetchPostMedia',
    async (postId: string) => {
        return await fetchMediaByAction('uploaded_to', postId)
    }
)



export const mediaGalerySlice = createSlice({
    name: 'mediaGalery',
    initialState,
    reducers: {
        setSelectedMedia: (state, action: PayloadAction<MediaType | null>) => {
            state.selectedMedia = action.payload
        },
        setMediaGaleryPost: (state, action: PayloadAction<string | undefined>) => {
            state.mediaGaleryPost = action.payload
        },
    },

    extraReducers(builder) {

        builder.addCase(fetchAllMedia.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, media: true }
        })

        builder.addCase(fetchPostMedia.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, postMedia: true }
        })


        builder.addCase(fetchAllMedia.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, media: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, media: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }
            //Записуємо дані з сервера у змінну
            state.media = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, media: false }
        })

        builder.addCase(fetchPostMedia.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, postMedia: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, postMedia: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.postMedia = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, postMedia: false }
        })



        builder.addCase(fetchAllMedia.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, postMedia: false }
        })

        builder.addCase(fetchPostMedia.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, postMedia: false }
        })
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedMedia, setMediaGaleryPost } = mediaGalerySlice.actions

export default mediaGalerySlice.reducer