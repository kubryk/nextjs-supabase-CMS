import { toast as Toast } from "sonner";
import { PostType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchPostsAction } from "@/actions/Post-Actions";
import { PostgrestError } from '@supabase/supabase-js';

export interface FetchPostsState {
    posts: PostType[] | null
    isLoading: boolean
    isError: PostgrestError | null
}

const initialState: FetchPostsState = {
    posts: null,
    isLoading: false,
    isError: null,
}

export const fetchPosts = createAsyncThunk(
    'fetchPosts',
    async () => {
        return await fetchPostsAction()
    }
)

export const fetchPostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},

    extraReducers(builder) {

        builder.addCase(fetchPosts.pending, (state, action) => {
            //включаємо завантаження
            state.isLoading = true
            // //Показуємо повідомлення про завантаження
            Toast.loading('Loading...')
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.isError = action.payload.error
                //Виключаємо завантаження
                state.isLoading = false
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.posts = action.payload.data
            //Виключаємо завантаження
            state.isLoading = false
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Posts successfully fetched')
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            //Виключаємо завантаження
            state.isLoading = false
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
        })
    },
})

// Action creators are generated for each case reducer function
// export const { setSelectedMedia } = fetchPostsSlice.actions

export default fetchPostsSlice.reducer