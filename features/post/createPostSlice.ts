import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostDataType, PostType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';
import { createSinglePostAction } from '@/actions/Post-Actions';

interface CreatePostState {
    result: PostType | null;
    loading: boolean;
    error: PostgrestError | null;
}

const initialState: CreatePostState = {
    result: null,
    loading: false,
    error: null,
};

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data: PostDataType) => {
        const result = await createSinglePostAction(data)
        return result;
    });

export const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                //Enable loading
                state.loading = true
                //Clear error
                state.error = null
                //Show loading message
                Toast.loading('Loading...')
            })

            .addCase(createPost.fulfilled, (state, action) => {
                if (action.payload.error) {
                    //Save error to variable
                    state.error = action.payload.error
                    //Disable loading
                    state.loading = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.message)
                    return
                }
                //Save data from DB to variable
                state.result = action.payload.data
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Post created successfully')
            })

            .addCase(createPost.rejected, (state, action) => {
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default createPostSlice.reducer;