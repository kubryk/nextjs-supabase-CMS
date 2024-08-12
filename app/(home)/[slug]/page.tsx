import { fetchSinglePostByAction } from "@/actions/Post-Actions";
import Container from "@/components/Container";
import AuthorBox from "@/components/home/post/AuthorBox";
import { createClient } from "@/lib/supabase/server";

import { format } from 'date-fns'
import Link from "next/link";

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

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // const captionOpen = /\[caption]/;
    // const captionClose = /\[\/caption]/;

    // const captionedTag: RegExp = /\[caption\].{1,}\[\/caption\]/g;
    // const imgRegExp: RegExp = /\<img.{1,}\/>/g;
    // const captionRegExp: RegExp = /\/>.{1,}\[\/caption]/;

    // //Шукаємо всі img з шорткодом caption
    // const shortcodedImages = post.data.content.matchAll(captionedTag);
    // //Перетворюємо в массив
    // const shortcodesArr = Array.from(shortcodedImages);

    // //TODO: баг якщо в тексті кепшону буде самозакривний тег


    // const shortcodesData = shortcodesArr.map((shortcodedTag) => {
    //     //Чистий тег img
    //     const cleanImg = shortcodedTag[0].match(imgRegExp)![0];
    //     //Індекс за якийм шорткод розміщений в повному тексті статті
    //     const startIndex = shortcodedTag['index'];
    //     //Довжина шорткоду
    //     const shortcodeLength = shortcodedTag[0].split('').length;
    //     //Чистимо текст caption від неботребу
    //     const cleanCaption = shortcodedTag[0].match(captionRegExp)![0].replace(captionClose, '').replace('/>', '');


    //     const taggedImg = `<div class="image_wrapper">` + cleanImg;
    //     const taggedCaption = `<div class="image_caption">` + cleanCaption + `</div></div>`

    //     return {
    //         cleanImg,
    //         cleanCaption,
    //         taggingResult: taggedImg + taggedCaption,
    //         startIndex,
    //         shortcodeLength
    //     }
    // });

    // shortcodesData.forEach((value, index) => {
    //     post.data.content = post.data.content.replace(/\[caption\].{1,}\[\/caption\]/, value.taggingResult)
    // })


    const captionContentRegExp: RegExp = /\[caption](.*?)\[\/caption]/g;
    const imgRegExp: RegExp = /\<img.*?\/>/g;
    const captionRegExpt: RegExp = /\/>(.*)/g;

    const captions = post.data.content.matchAll(captionContentRegExp)
    const captionsData = Array.from(captions);

    const shortcodesData = captionsData.map((shortcode) => {
        //Чистий тег img
        const cleanImg = shortcode[1].match(imgRegExp)![0];
        //Шукаємо caption
        const cleanCaption = shortcode[1].matchAll(captionRegExpt);
        //перетворюємо в масив
        const captionsData = Array.from(cleanCaption);

        const taggedImg = `<div class="image_wrapper">` + cleanImg;
        const taggedCaption = `<div class="image_caption">` + captionsData[0][1] + `</div></div>`

        return {
            shortcode: shortcode[1],
            cleanImg,
            cleanCaption: captionsData[0][1],
            taggedResult: taggedImg + taggedCaption
        }
    });

    shortcodesData.forEach((value, index) => {
        post.data.content = post.data.content.replace(/\[caption\].{1,}\[\/caption\]/, value.taggedResult)
    })



    return (
        <Container>
            <article className="flex flex-col items-center gap-5 max-w-4xl pt-8">
                <h2 className=" text-4xl">{post.data.title}</h2>
                {user &&
                    <Link
                        className=" bg-indigo-300 rounded-md px-9 py-1 text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300"
                        href={`/dashboard/posts/update/?id=${post.data.id}`}
                    >
                        Edit post
                    </Link>}
                <div className="flex gap-3 text-[12px] text-gray-500 w-[100%]">
                    <div>Last updated on {format(post.data.updated_at, "PPP")}</div>
                </div>
                <AuthorBox authorId={post.data.author} />
                <div className=" text-lg" dangerouslySetInnerHTML={{ __html: post.data.content }} />
            </article>
        </Container>
    )
}