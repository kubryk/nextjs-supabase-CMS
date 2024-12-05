import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSingleAuthorAction, fetchAuthorByAction, fetchAuthorsAction, updateAuthorAction } from '@/actions/Author-Actions';
import { AuthorDataType, AuthorsType } from '@/types/global';
import { toast as Toast } from "sonner";
import { PostgrestError } from '@supabase/supabase-js';

interface UpdateAuthorState {
    results: {
        update: AuthorsType | null,
        fetch: AuthorsType | null
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

const initialState: UpdateAuthorState = {
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

export const updateAuthor = createAsyncThunk('authors/updateAuthor', async ({ id, data }: { id: string, data: AuthorDataType }) => {
    return await updateAuthorAction(id, data);
});

export const fetchUpdatingAuthor = createAsyncThunk('authors/fetchUpdatingAuthor', async (id: string) => {
    return await fetchAuthorByAction('id', id);
});

export const updateAuthorSlice = createSlice({
    name: 'updateAuthor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAuthor.pending, (state) => {
                //Enable loading
                state.loadings.update = true
                //Clear error
                state.errors.update = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(updateAuthor.fulfilled, (state, action) => {

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
                Toast.success('Author successfully updated')
            })
            .addCase(updateAuthor.rejected, (state, action) => {
                //Disable loading
                state.loadings.update = false
                //Close loading message
                Toast.dismiss()
            });




        builder
            .addCase(fetchUpdatingAuthor.pending, (state) => {
                //Enable loading
                state.loadings.fetch = true
                //Clear error
                state.errors.fetch = null
                //Show loading message
                Toast.loading('Loading...')
            })
            .addCase(fetchUpdatingAuthor.fulfilled, (state, action) => {

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
                Toast.success('Author successfully fetched')
            })
            .addCase(fetchUpdatingAuthor.rejected, (state, action) => {
                //Disable loading
                state.loadings.fetch = false
                //Close loading message
                Toast.dismiss()
            });
    },
});


export default updateAuthorSlice.reducer;