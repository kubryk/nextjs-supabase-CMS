import { toast as Toast } from "sonner";
import { PostType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostgrestError } from '@supabase/supabase-js';
import { deleteSinglePostAction } from "@/actions/Post-Actions";

export interface DeletePostsState {
    deletedPost: PostType | null
    deletePostLoading: boolean
    deletePostError: PostgrestError | null
}

const initialState: DeletePostsState = {
    deletedPost: null,
    deletePostLoading: false,
    deletePostError: null,
}

export const deletePost = createAsyncThunk(
    'deletePost',
    async (postId: string) => {
        return await deleteSinglePostAction(postId)
    }
)

export const deletePostSlice = createSlice({
    name: 'deletePost',
    initialState,
    reducers: {},

    extraReducers(builder) {

        builder.addCase(deletePost.pending, (state, action) => {
            //включаємо завантаження
            state.deletePostLoading = true
            // //Показуємо повідомлення про завантаження
            Toast.loading('Loading...')
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.deletePostError = action.payload.error
                //Виключаємо завантаження
                state.deletePostLoading = false
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.deletedPost = action.payload.data
            //Виключаємо завантаження
            state.deletePostLoading = false
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Posts successfully deleted')
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            //Виключаємо завантаження
            state.deletePostLoading = false
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
        })
    },
})

// Action creators are generated for each case reducer function
// export const { setSelectedMedia } = fetchPostsSlice.actions

export default deletePostSlice.reducer