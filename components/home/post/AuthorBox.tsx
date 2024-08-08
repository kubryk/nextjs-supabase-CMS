import { fetchAuthorByAction } from "@/actions/Author-Actions";
import { fetchMediaByAction, fetchSingleMediaByAction } from "@/actions/Media-Actions";
import { AuthorsType } from "@/types/global"
import createMediaPath from "@/utils/mediaPath";
import Image from "next/image"
import { SlSocialInstagram, SlSocialFacebook } from "react-icons/sl";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";

const AuthorBox = async ({ authorId }: { authorId: string }) => {
    const author = await fetchAuthorByAction('id', authorId);
    if (!author.data) return null
    const author_photo = await fetchSingleMediaByAction('id', author.data.photo);

    return (
        <div className="flex w-[100%] mb-8 gap-4">
            {author_photo.data &&
                <Link href={'#'}>
                    <Image className=" rounded-md" src={`/media/${createMediaPath(author_photo.data).mediaPath}`} width={75} height={75} alt=""></Image>
                </Link>
            }
            <div className="flex flex-col justify-between">
                <Link className=" text-lg font-semibold" href={'#'}>{author.data.name}</Link>
                <div className="text-sm">{author.data.whois}</div>
                <div className="flex gap-1">
                    <Link className=" text-lg font-semibold" href={'#'}><FaFacebookSquare size={18} /></Link>
                    <Link className=" text-lg font-semibold" href={'#'}><FaInstagramSquare size={18} /></Link>
                </div>

            </div>
        </div>
    )
}

export default AuthorBox;