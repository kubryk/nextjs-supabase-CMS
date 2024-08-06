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

        fetchPosts: fetchPostsSlice,
        // createPost: createPostSlice,
        updatePost: updatePostSlice,
        mediaGalery: mediaGalerySlice,
        deletePost: deletePostSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch