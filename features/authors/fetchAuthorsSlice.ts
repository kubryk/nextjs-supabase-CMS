import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthorsAction } from '@/actions/Author-Actions';
import { AuthorsType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';

interface AuthorsState {
    authors: AuthorsType[] | null;
    loading: boolean;
    error: PostgrestError | null;
}

const initialState: AuthorsState = {
    authors: null,
    loading: false,
    error: null,
};

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
    const result = await fetchAuthorsAction()
    return result;
});

export const fetchAuthorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                //Enable loading
                state.loading = true
                //Clear error
                state.error = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                if (action.payload.error) {
                    //Save error to variable
                    state.error = action.payload.error
                    //Disable loading
                    state.loading = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.details)
                    return
                }

                //Save data from DB to variable
                state.authors = action.payload.data
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Authors successfully fetched')
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default fetchAuthorsSlice.reducer;