'use server'
import { fetchPostsAction } from "@/actions/Post-Actions";
import { deleteSinglePostAction } from "@/actions/Post-Actions";
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

const DashboardPosts = async () => {

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
                                            redirectUrl={`/dashboard/posts/update?id=${post.id}`}
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

export default DashboardPosts;