'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Link from "next/link";
import ActionButton from "../../customUI/ActionButton";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { HTMLAttributes, useEffect } from "react";
import { fetchPosts } from "@/features/post/fetchPostsSlice";
import { deletePost } from "@/features/post/deletePostSlice";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


const DashboardPosts = (props: HTMLAttributes<HTMLTableElement>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { posts, isLoading } = useAppSelector(state => state.fetchPosts);
    const { deletedPost, deletePostLoading } = useAppSelector(state => state.deletePost);
    // const { categories } = useAppSelector(state => state.fetchCategories);


    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const deleteHandler = (id: string) => {
        dispatch(deletePost(id))
        dispatch(fetchPosts())
    }

    const updateHandler = (id: string) => {
        router.push(`/dashboard/posts/update?id=${id}`)
    }

    return (
        <div {...props}>
            {posts &&
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead >Status</TableHead>

                            <TableHead >Title</TableHead>
                            <TableHead >Category</TableHead>

                            <TableHead >Date</TableHead>
                            {/* <TableHead >Url</TableHead> */}
                            <TableHead >Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {posts.map((post) => {
                            return (
                                <TableRow className=" hover:bg-indigo-300 duration-700 cursor-pointer" key={post.id}>
                                    <TableCell className={cn("text-[12px] font-bold", post.status === 'publish' ? ' text-green-600' : post.status === 'draft' ? ' text-orange-500' : ' text-blue-600')}>
                                        {post.status}
                                    </TableCell>
                                    <TableCell>
                                        {post.title}
                                    </TableCell>
                                    <TableCell >
                                        {post.category}
                                    </TableCell>
                                    <TableCell className=" text-[12px]">
                                        {format(post.created_at, 'P')}
                                    </TableCell>

                                    {/* <TableCell >
                                        <Link className='hover:text-blue-600' href={`/${post.url}`}>
                                            {post.url}
                                        </Link>
                                    </TableCell> */}
                                    <TableCell className="text-right flex gap-2 ">
                                        <Button
                                            size={'icon'}
                                            onClick={() => updateHandler(post.id)}
                                        >
                                            {deletePostLoading || isLoading ? <PuffLoader color="white" size={25} /> : <FaEdit />}
                                        </Button>

                                        <Button
                                            disabled={deletePostLoading}
                                            size={'icon'}
                                            variant={'destructive'}
                                            onClick={() => deleteHandler(post.id)}
                                        >
                                            {deletePostLoading || isLoading ? <PuffLoader size={25} /> : <MdOutlineDeleteForever size={20} />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table >
            }
        </div>
    );
}

export default DashboardPosts;