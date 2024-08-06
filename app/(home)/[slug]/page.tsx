import { fetchSinglePostByAction } from "@/actions/Post-Actions";
import Container from "@/components/Container";
import useSupabase from "@/hooks/useSupabase";

// export const metadata = {
//     title: "Test",
//     description: "Test"
// }

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
                {/* <div class="image_wrapper">
                    <img class="image" src="http://localhost:3000/media/2024/7/tattoo_third_447530865_18413354962069581_5281590481390354766_n.jpg" />
                    <div class="image_caption">@caption</div>
                </div> */}
                {/* <a href="https://instagram.com/tattooassist">@tattooassist</a> */}
            </Container>
        )
    }

    return <div>Post not found</div>
}