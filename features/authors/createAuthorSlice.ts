import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSingleAuthorAction, fetchAuthorsAction } from '@/actions/Author-Actions';
import { AuthorDataType, AuthorsType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';

interface CreateAuthorState {
    createResult: AuthorsType | null;
    createLoading: boolean;
    createError: PostgrestError | null;
}

const initialState: CreateAuthorState = {
    createResult: null,
    createLoading: false,
    createError: null,
};

export const createAuthor = createAsyncThunk('authors/createAuthor', async (authorData: AuthorDataType) => {
    const result = await createSingleAuthorAction(authorData)
    return result;
});

export const createAuthorSlice = createSlice({
    name: 'createAuthor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAuthor.pending, (state) => {
                //Enable loading
                state.createLoading = true
                //Clear error
                state.createError = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(createAuthor.fulfilled, (state, action) => {

                if (action.payload.error) {
                    //Save error to variable
                    state.createError = action.payload.error
                    //Disable loading
                    state.createLoading = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.details)
                    return
                }

                //Save data from DB to variable
                state.createResult = action.payload.data
                //Disable loading
                state.createLoading = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Authors created successfully')
            })
            .addCase(createAuthor.rejected, (state, action) => {
                //Disable loading
                state.createLoading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default createAuthorSlice.reducer;