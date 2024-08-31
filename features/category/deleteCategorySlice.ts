import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSingleAuthorAction, deleteSingleAuthorAction, fetchAuthorsAction } from '@/actions/Author-Actions';
import { AuthorDataType, AuthorsType, PostCategoryType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';
import { deleteCategoryAction } from '@/actions/Category-Actions';

interface DeleteCategoryState {
    deleteResult: PostCategoryType | null;
    deleteLoading: boolean;
    deleteError: PostgrestError | null;
}

const initialState: DeleteCategoryState = {
    deleteResult: null,
    deleteLoading: false,
    deleteError: null,
};

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (data: string) => {
    const result = await deleteCategoryAction(data);
    return result;
});

export const deleteCategorySlice = createSlice({
    name: 'deleteCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCategory.pending, (state) => {
                //Enable loading
                state.deleteLoading = true
                //Clear error
                state.deleteError = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {

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
                Toast.success('Category successfully deleted')
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                //Disable loading
                state.deleteLoading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default deleteCategorySlice.reducer;