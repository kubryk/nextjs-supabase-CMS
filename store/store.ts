import createAuthorSlice from '@/features/authors/createAuthorSlice'
import deleteAuthorSlice from '@/features/authors/deleteAuthorSlice'
import fetchAuthorsSlice from '@/features/authors/fetchAuthorsSlice'
import updateAuthorSlice from '@/features/authors/updateAuthorSlice'
import createCategorySlice from '@/features/category/createCategorySlice'
import deleteCategorySlice from '@/features/category/deleteCategorySlice'
import fetchCategoriesSlice from '@/features/category/fetchCategoriesSlice'
import updateCategorySlice, { updateCategory } from '@/features/category/updateCategorySlice'
import deleteMediaSlice from '@/features/media/deleteMediaSlice'
import mediaGalerySlice from '@/features/media/MediaGalerySlice'
import updateMediaSlice from '@/features/media/updateMediaSlice'
import createPostSlice from '@/features/post/createPostSlice'
import deletePostSlice from '@/features/post/deletePostSlice'
import fetchPostsSlice from '@/features/post/fetchPostsSlice'
import updatePostSlice, { fetchCategories } from '@/features/post/updatePostSlice'
import { configureStore } from '@reduxjs/toolkit'
import { create } from 'domain'

export const store = configureStore({
    reducer: {
        updateMedia: updateMediaSlice,
        deleteMedia: deleteMediaSlice,
        mediaGalery: mediaGalerySlice,
        //createMedia

        fetchPosts: fetchPostsSlice,
        updatePost: updatePostSlice,
        deletePost: deletePostSlice,
        createPost: createPostSlice,

        fetchAuthors: fetchAuthorsSlice,
        updateAuthors: updateAuthorSlice,
        createAuthors: createAuthorSlice,
        deleteAuthors: deleteAuthorSlice,

        fetchCategories: fetchCategoriesSlice,
        createCategory: createCategorySlice,
        updateCategory: updateCategorySlice,
        deleteCategory: deleteCategorySlice,

    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch