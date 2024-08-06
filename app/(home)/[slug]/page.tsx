
import { fetchSinglePostByAction } from "@/actions/Post-Actions";
import Container from "@/components/Container";
import useSupabase from "@/hooks/useSupabase";

export const metadata = {
    title: "Test",
    description: "Test"
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    'use server'
    const post = await fetchSinglePostByAction('url', params.slug)

    if (post.data) {
        const convertedDate = new Date(post.data.created_at).toLocaleDateString('en-ZA');
        return (
            <Container>
                <article className="flex flex-col items-center gap-5 max-w-4xl">
                    <h2 className=" text-4xl">{post.data.title}</h2>
                    <div>{convertedDate}</div>
                    <div className=" text-lg" dangerouslySetInnerHTML={{ __html: post.data.content }} />
                </article>
            </Container>
        )
    }

    return <div>Post not found</div>
}