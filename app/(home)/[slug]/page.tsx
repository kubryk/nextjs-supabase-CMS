import { fetchAuthorByAction } from "@/actions/Author-Actions";
import { fetchMediaByAction } from "@/actions/Media-Actions";
import { fetchSinglePostByAction } from "@/actions/Post-Actions";
import Container from "@/components/Container";
import AuthorField from "@/components/home/post/AuthorField";
import useSupabase from "@/hooks/useSupabase";
import createMediaPath from "@/utils/mediaPath";
import Image from "next/image";


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

    if (post.data) {
        const convertedDate = new Date(post.data.created_at).toLocaleDateString('en-ZA');
        return (
            <Container>
                <article className="flex flex-col items-center gap-5 max-w-4xl">
                    <h2 className=" text-4xl">{post.data.title}</h2>
                    <div className="flex gap-3 text-[12px] text-gray-500 w-[100%] mt-4">
                        <div>Published: {convertedDate}</div>
                        <div>Updated: {convertedDate}</div>
                    </div>
                    <AuthorField authorId={post.data.author} />
                    <div className=" text-lg" dangerouslySetInnerHTML={{ __html: post.data.content }} />
                </article>
            </Container>
        )
    }

    return <div>Post not found</div>
}