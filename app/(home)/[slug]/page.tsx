import { fetchSinglePostByAction } from "@/actions/Post-Actions";
import Container from "@/components/Container";
import AuthorBox from "@/components/home/post/AuthorBox";

import { format } from 'date-fns'

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const post = await fetchSinglePostByAction('url', params.slug);
    if (post.data) {
        return {
            title: post.data.meta_title ? post.data.meta_title : post.data.title,
            description: post.data?.meta_description
        }
    }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await fetchSinglePostByAction('url', params.slug);
    if (!post.data) return <>Post not found</>

    return (
        <Container>
            <article className="flex flex-col items-center gap-5 max-w-4xl">
                <h2 className=" text-4xl">{post.data.title}</h2>
                <div className="flex gap-3 text-[12px] text-gray-500 w-[100%] ">
                    <div>Last updated on {format(post.data.updated_at, "PPP")}</div>
                </div>
                <AuthorBox authorId={post.data.author} />
                <div className=" text-lg" dangerouslySetInnerHTML={{ __html: post.data.content }} />
            </article>
        </Container>
    )
}