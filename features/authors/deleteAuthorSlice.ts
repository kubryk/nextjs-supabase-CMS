import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSingleAuthorAction, deleteSingleAuthorAction, fetchAuthorsAction } from '@/actions/Author-Actions';
import { AuthorDataType, AuthorsType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';

interface DeleteAuthorState {
    deleteResult: AuthorsType | null;
    deleteLoading: boolean;
    deleteError: PostgrestError | null;
}

const initialState: DeleteAuthorState = {
    deleteResult: null,
    deleteLoading: false,
    deleteError: null,
};

export const deleteAuthor = createAsyncThunk('authors/deleteAuthor', async (authorData: string) => {
    const result = await deleteSingleAuthorAction(authorData)
    return result;
});

export const deleteAuthorSlice = createSlice({
    name: 'deleteAuthor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAuthor.pending, (state) => {
                //Enable loading
                state.deleteLoading = true
                //Clear error
                state.deleteError = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {

                if (action.payload.error) {
                    //Save error to variable
                    state.deleteError = action.payload.error
                    //Disable loading
                    state.deleteLoading = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.details)
                    return
                }

                //Save data from DB to variable
                state.deleteResult = action.payload.data
                //Disable loading
                state.deleteLoading = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Author successfully deleted')
            })
            .addCase(deleteAuthor.rejected, (state, action) => {
                //Disable loading
                state.deleteLoading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default deleteAuthorSlice.reducer;