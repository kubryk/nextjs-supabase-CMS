import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthorsAction } from '@/actions/Author-Actions';
import { AuthorsType, PostCategoryType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';
import { fetchCategoriesAction } from '@/actions/Category-Actions';

interface CategoriesState {
    categories: PostCategoryType[] | null;
    loading: boolean;
    error: PostgrestError | null;
}

const initialState: CategoriesState = {
    categories: null,
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const result = await fetchCategoriesAction()
    return result;
});

export const fetchCategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                //Enable loading
                state.loading = true
                //Clear error
                state.error = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
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
                state.categories = action.payload.data
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Categories successfully fetched')
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default fetchCategoriesSlice.reducer;