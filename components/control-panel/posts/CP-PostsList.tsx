'use server'
// import fetchPostsAction from "@/actions/fetchPostsAction";
import { fetchPostsAction } from "@/actions/Post-Actions";
// import { deletePostAction, IDeletePostActionProps, UpdatePostActionProps, updatePostsAction } from "@/actions/Post-Actions";
import { deleteSinglePostAction } from "@/actions/Post-Actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deletePost } from "@/features/post/deletePostSlice";
import { fetchPosts } from "@/features/post/fetchPostsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import ActionButton from "../../customUI/ActionButton";
import { redirect } from "next/navigation";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { PostType } from "@/types/global";

const PostsList = async () => {
    // const router = useRouter();
    // const dispatch = useAppDispatch();

    // const { posts, isLoading, isError } = useAppSelector(state => state.fetchPosts);
    // const { deletedPost, deletePostLoading, deletePostError } = useAppSelector(state => state.deletePost);

    // const deletePostOnClick = async (postId: string) => {
    //     await dispatch(deletePost(postId));
    //     await dispatch(fetchPosts());
    // }

    // useEffect(() => {
    //     dispatch(fetchPosts())
    // }, [])

    // if (isLoading) return <PuffLoader />

    const posts = await fetchPostsAction();
    return (
        <>
            {posts.data &&
                <Table >
                    <TableHeader>
                        <TableRow >
                            <TableHead >Status</TableHead>
                            <TableHead >Title</TableHead>
                            <TableHead >Category</TableHead>
                            <TableHead >Date</TableHead>
                            <TableHead >Url</TableHead>
                            <TableHead >Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {posts.data.map((post) => {
                            const convertedDate = new Date(post.created_at).toLocaleDateString('en-ZA');
                            const statusStyle = (post.status === 'publish' ? ' bg-green-500' : post.status === 'draft' ? ' bg-orange-500' : ' bg-blue-500');
                            return (
                                <TableRow className={statusStyle} key={post.id}>
                                    <TableCell >{post.status}</TableCell>
                                    <TableCell >{post.title}</TableCell>
                                    <TableCell >{post.category}</TableCell>
                                    <TableCell >{convertedDate}</TableCell>
                                    <TableCell >
                                        <Link
                                            className='hover:text-blue-600'
                                            href={`/${post.url}`}
                                        >
                                            {post.url}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right flex gap-4 ">

                                        <ActionButton
                                            redirectUrl={`/control-panel/posts/update?id=${post.id}`}
                                            text='Edit'
                                        />

                                        <ActionButton<typeof deleteSinglePostAction, string>
                                            variant={'destructive'}
                                            actionParams={post.id}
                                            action={deleteSinglePostAction}
                                            text="Delete"
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </>
    );
}

export default PostsList;