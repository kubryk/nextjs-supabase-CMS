import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSingleAuthorAction, fetchAuthorByAction, fetchAuthorsAction, updateAuthorAction } from '@/actions/Author-Actions';
import { AuthorDataType, AuthorsType, CategoryDataType, PostCategoryType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';
import { fetchSingleCategoryByAction, updateCategoryAction } from '@/actions/Category-Actions';

interface UpdateCategoryState {
    results: {
        update: PostCategoryType | null,
        fetch: PostCategoryType | null
    }
    loadings: {
        update: boolean,
        fetch: boolean
    }
    errors: {
        update: PostgrestError | null,
        fetch: PostgrestError | null
    }
}

const initialState: UpdateCategoryState = {
    results: {
        update: null,
        fetch: null
    },
    loadings: {
        update: false,
        fetch: false
    },
    errors: {
        update: null,
        fetch: null
    }
};

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, data }: { id: string, data: CategoryDataType }) => {
    return await updateCategoryAction(data, id);
});

export const fetchUpdatingCategory = createAsyncThunk('categories/fetchUpdatingCategory', async (id: string) => {
    return await fetchSingleCategoryByAction('id', id);
});

export const updateCategorySlice = createSlice({
    name: 'updateCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCategory.pending, (state) => {
                //Enable loading
                state.loadings.update = true
                //Clear error
                state.errors.update = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(updateCategory.fulfilled, (state, action) => {

                if (action.payload.error) {
                    //Save error to variable
                    state.errors.update = action.payload.error
                    //Disable loading
                    state.loadings.update = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.details)
                    return
                }

                //Save data from DB to variable
                state.results.update = action.payload.data
                //Disable loading
                state.loadings.update = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Category successfully updated')
            })
            .addCase(updateCategory.rejected, (state, action) => {
                //Disable loading
                state.loadings.update = false
                //Close loading message
                Toast.dismiss()
            });




        builder
            .addCase(fetchUpdatingCategory.pending, (state) => {
                //Enable loading
                state.loadings.fetch = true
                //Clear error
                state.errors.fetch = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(fetchUpdatingCategory.fulfilled, (state, action) => {

                if (action.payload.error) {
                    //Save error to variable
                    state.errors.fetch = action.payload.error
                    //Disable loading
                    state.loadings.fetch = false
                    //Close loading message
                    Toast.dismiss()
                    //Show error
                    Toast.error(action.payload.error.details)
                    return
                }

                //Save data from DB to variable
                state.results.fetch = action.payload.data
                //Disable loading
                state.loadings.fetch = false
                //Close loading message
                Toast.dismiss()
                //Show success message
                Toast.success('Category successfully fetched')
            })
            .addCase(fetchUpdatingCategory.rejected, (state, action) => {
                //Disable loading
                state.loadings.fetch = false
                //Close loading message
                Toast.dismiss()
            });
    },
});


export default updateCategorySlice.reducer;