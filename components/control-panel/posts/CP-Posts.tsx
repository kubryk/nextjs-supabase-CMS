'use server'

import { Provider } from "react-redux";
import { store } from "@/store/store";
import PostsList from "./CP-PostsList";


const CPPosts = () => {
    // //Фетч постів
    // const posts = useServerAction<PostType[], null>({
    //     action: fetchPostsAction,
    //     successMessage: 'Success fetching posts'
    // });

    // //Видалення поста
    // const deletePost = useServerAction<null, any>({
    //     action: deletePostAction,
    //     successMessage: 'Post has been deleted'
    // });

    // //Фетчимо всі пости при загрузці сторінки
    // useEffect(() => { posts.useAction() }, [])

    // //Видалення поста
    // const deletePostOnClick = async (postId: string) => {
    //     //Видаляємо пост
    //     await deletePost.useAction({ postId })
    //     //Фетчимо нові пости
    //     await posts.useAction()
    // }

    return (
        <>
            {/* <Provider store={store}> */}
            <PostsList />
            {/* </Provider> */}
        </>
    );
}

export default CPPosts;