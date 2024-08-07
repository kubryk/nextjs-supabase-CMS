import { toast as Toast } from "sonner";
import { AuthorsType, MediaType, PostCategoryType, PostDataType, PostType } from '@/types/global'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import { fetchSingleMediaByAction } from "@/actions/Media-Actions";
import { fetchSinglePostByAction, updateSinglePostAction } from "@/actions/Post-Actions";
import { fetchCategoriesAction } from "@/actions/Category-Actions";
import { fetchAuthorsAction } from "@/actions/Author-Actions";

interface IUpdatePostErrors {
    post: PostgrestError | null
    categories: PostgrestError | null
    authors: PostgrestError | null
    featuredMedia: PostgrestError | null
    update: PostgrestError | null
}

interface IUpdatePostLoading {
    post: boolean
    categories: boolean
    authors: boolean
    featuredMedia: boolean
    update: boolean
}

export interface IUpdatePostFormState {
    post: PostType | null
    categories: PostCategoryType[] | null
    authors: AuthorsType[] | null
    featuredMedia: MediaType | null
    loadings: IUpdatePostLoading
    errors: IUpdatePostErrors
    update: PostgrestSingleResponse<PostType> | null
}

const initialState: IUpdatePostFormState = {
    post: null,
    categories: null,
    authors: null,
    featuredMedia: null,
    update: null,
    loadings: {
        post: false,
        categories: false,
        authors: false,
        featuredMedia: false,
        update: false
    },
    errors: {
        post: null,
        categories: null,
        authors: null,
        featuredMedia: null,
        update: null
    },
}

export const fetchPost = createAsyncThunk(
    'fetchPost',
    async (postId: string,) => {
        return await fetchSinglePostByAction('id', postId);
    }
)

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        return await fetchCategoriesAction();
    }
)

export const fetchAuthors = createAsyncThunk(
    'fetchAuthors',
    async () => {
        return await fetchAuthorsAction();
    }
)

export const fetchFeaturedMedia = createAsyncThunk(
    'fetchFeaturedMedia',
    async (mediaId: string) => {
        return await fetchSingleMediaByAction('id', mediaId);
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async ({ data, postId }: { data: PostDataType, postId: string }) => {
        return await updateSinglePostAction({ data, postId })
    }
)


export const UpdatePostFormSlice = createSlice({
    name: 'updatePostForm',
    initialState,
    reducers: {
        nullFeaturedMedia: (state) => {
            state.featuredMedia = null
        },
        nullPost: (state) => {
            state.post = null
        },
    },

    extraReducers(builder) {

        builder.addCase(fetchPost.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, post: true }
        })

        builder.addCase(fetchAuthors.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, authors: true }
        })

        builder.addCase(fetchCategories.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, categories: true }
        })

        builder.addCase(fetchFeaturedMedia.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, featuredMedia: true }
        })

        builder.addCase(updatePost.pending, (state, action) => {
            //включаємо завантаження
            state.loadings = { ...state.loadings, update: true }
            // //Показуємо повідомлення про завантаження
            Toast.loading('Post updating. Loading...')
        })






        //Пост
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, post: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, post: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.post = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, post: false }
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, categories: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, categories: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.categories = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, categories: false }
        })

        builder.addCase(fetchAuthors.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, authors: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, authors: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.authors = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, authors: false }
        })

        builder.addCase(fetchFeaturedMedia.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, featuredMedia: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, featuredMedia: false }
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }
            //Записуємо дані з сервера у змінну
            state.featuredMedia = action.payload.data
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, featuredMedia: false }
        })

        builder.addCase(updatePost.fulfilled, (state, action) => {
            if (action.payload.error) {
                //Зберігаємо помилку в змінну
                state.errors = { ...state.errors, update: action.payload.error }
                //Виключаємо завантаження
                state.loadings = { ...state.loadings, update: false }
                //Закриваємо повідомлення завантаження
                Toast.dismiss()
                //Показуємо помилку
                Toast.error(action.payload.error.details)
                return
            }

            //Записуємо дані з сервера у змінну
            state.update = action.payload
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, update: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
            //Показуємо повідомлення про успіх
            Toast.success('Posts successfully updated!')
        })






        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loadings = { ...state.loadings, post: false }
        })

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loadings = { ...state.loadings, categories: false }
        })

        builder.addCase(fetchAuthors.rejected, (state, action) => {
            state.loadings = { ...state.loadings, authors: false }
        })

        builder.addCase(fetchFeaturedMedia.rejected, (state, action) => {
            state.loadings = { ...state.loadings, featuredMedia: false }
        })

        builder.addCase(updatePost.rejected, (state, action) => {
            //Виключаємо завантаження
            state.loadings = { ...state.loadings, update: false }
            //Закриваємо повідомлення завантаження
            Toast.dismiss()
        })

        // builder.addCase(fetchPosts.fulfilled, (state, action) => {
        //     if (action.payload.error) {
        //         //Зберігаємо помилку в змінну
        //         state.isError = action.payload.error
        //         //Виключаємо завантаження
        //         state.isLoading = false
        //         //Закриваємо повідомлення завантаження
        //         Toast.dismiss()
        //         //Показуємо помилку
        //         Toast.error(action.payload.error.details)
        //         return
        //     }

        //     //Записуємо дані з сервера у змінну
        //     state.posts = action.payload.data
        //     //Виключаємо завантаження
        //     state.isLoading = false
        //     //Закриваємо повідомлення завантаження
        //     Toast.dismiss()
        //     //Показуємо повідомлення про успіх
        //     Toast.success('Posts successfully fetched')
        // })
        // builder.addCase(fetchPosts.rejected, (state, action) => {
        //     //Виключаємо завантаження
        //     state.isLoading = false
        //     //Закриваємо повідомлення завантаження
        //     Toast.dismiss()
        // })
    },
})

// Action creators are generated for each case reducer function
export const { nullFeaturedMedia, nullPost } = UpdatePostFormSlice.actions

export default UpdatePostFormSlice.reducer