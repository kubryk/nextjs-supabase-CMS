import createAuthorSlice from '@/features/authors/createAuthorSlice'
import deleteAuthorSlice from '@/features/authors/deleteAuthorSlice'
import fetchAuthorsSlice from '@/features/authors/fetchAuthorsSlice'
import updateAuthorSlice from '@/features/authors/updateAuthorSlice'
import deleteMediaSlice from '@/features/media/deleteMediaSlice'
import mediaGalerySlice from '@/features/media/MediaGalerySlice'
import updateMediaSlice from '@/features/media/updateMediaSlice'
import deletePostSlice from '@/features/post/deletePostSlice'
import fetchPostsSlice from '@/features/post/fetchPostsSlice'
import updatePostSlice from '@/features/post/updatePostSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        updateMedia: updateMediaSlice,
        deleteMedia: deleteMediaSlice,
        mediaGalery: mediaGalerySlice,

        fetchPosts: fetchPostsSlice,
        updatePost: updatePostSlice,
        deletePost: deletePostSlice,

        fetchAuthors: fetchAuthorsSlice,
        updateAuthors: updateAuthorSlice,
        createAuthors: createAuthorSlice,
        deleteAuthors: deleteAuthorSlice,

    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch