import { fetchAuthorByAction } from "@/actions/Author-Actions";
import { fetchMediaByAction } from "@/actions/Media-Actions";
import { AuthorsType } from "@/types/global"
import createMediaPath from "@/utils/mediaPath";
import Image from "next/image"

const AuthorField = async ({ authorId }: { authorId: string }) => {
    const author = await fetchAuthorByAction('id', authorId);
    if (!author.data) return null
    const author_photo = await fetchMediaByAction('id', author.data.photo);

    return (
        <div className="flex w-[100%] mb-8 gap-4">
            {author_photo.data &&
                <Image className=" rounded-md" src={`/media/${createMediaPath(author_photo.data).mediaPath}`} width={75} height={75} alt=""></Image>
            }
            <div className="flex flex-col">
                <div className=" text-lg font-semibold">{author.data.name}</div>
                <div className="text-sm">{author.data.whois}</div>
            </div>
        </div>
    )
}

export default AuthorField;