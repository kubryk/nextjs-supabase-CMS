'use server'
import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/types/global";
import createMediaPath from "@/lib/mediaPath";
import { fetchCategoriesByAction, fetchSingleCategoryByAction } from "@/actions/Category-Actions";
import { fetchAuthorByAction } from "@/actions/Author-Actions";
import { fetchMediaByAction, fetchSingleMediaByAction } from "@/actions/Media-Actions";
import { format } from 'date-fns'

const FeedPost = async ({ postData }: { postData: PostType }) => {
    const postCategory = await fetchSingleCategoryByAction('id', postData.category)
    const postAuthor = await fetchAuthorByAction('id', postData.author)
    const postFeaturedImage = await fetchSingleMediaByAction('id', postData.featured_image)

    const convertedDate = new Date(postData.created_at).toLocaleDateString('en-ZA');

    return (
        <article className="flex md:flex-row flex-col items-center max-w-[800px] max-h-[auto]">
            {postFeaturedImage.data &&
                <Link href={{
                    pathname: `/${postData.url}`,
                }}>
                    <Image
                        src={`/media/${createMediaPath(postFeaturedImage.data).mediaPath}`}
                        alt={postFeaturedImage.data?.alt}
                        width={320}
                        height={350}
                        className=" rounded-xl shadow-lg md:w-[100%]"
                        loading="lazy"
                    />
                </Link>
            }

            <div className="flex flex-col flex-1 gap-3 p-3">
                <Link className=" text-3xl" href={`/${postData.url}`}>{postData.title}</Link>
                {postCategory.data &&
                    <Link className=" text-sm text-gray-400" href={'/categories/' + postCategory.data.url}>
                        {postCategory.data.name}
                    </Link>
                }

                <div className="text-ellipsis">{postData.description}</div>
                <div className="flex gap-8 items-center">
                    {postAuthor.data && <Link className=" text-[11px]" href={'/'}>by <span className=" text-[13px] font-medium">{postAuthor.data.name}</span></Link>}
                    <Link className=" text-[12px]" href={'/'}>{format(postData.updated_at, "PPP")}</Link>
                </div>

            </div>

        </article>
    )
}

export default FeedPost;