import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryDataType, PostCategoryType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';
import { createCategoryAction } from '@/actions/Category-Actions';

interface CreateCategoryState {
    result: PostCategoryType | null;
    loading: boolean;
    error: PostgrestError | null;
}

const initialState: CreateCategoryState = {
    result: null,
    loading: false,
    error: null,
};

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (data: CategoryDataType) => {
        const result = await createCategoryAction(data)
        return result;
    });

export const createCategorySlice = createSlice({
    name: 'createCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                //Enable loading
                state.loading = true
                //Clear error
                state.error = null
                //Show loading message
                Toast.loading('Loading...')
            })

            .addCase(createCategory.fulfilled, (state, action) => {
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
                Toast.success('Category created successfully')
            })

            .addCase(createCategory.rejected, (state, action) => {
                //Disable loading
                state.loading = false
                //Close loading message
                Toast.dismiss()
            });
    },
});

export default createCategorySlice.reducer;