'use client'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { RefObject } from "react"
import { setSelectedMedia } from "@/features/media/MediaGalerySlice"
import MediaList from "./MediaList"
import MediaEditor from "./MediaEditor"
import { PostType } from "@/types/global"
import useMediaGalery from "../../../hooks/useMediaGalery"


interface IMediaGaleryProps {
    post?: PostType | null
    editorField?: RefObject<HTMLTextAreaElement>
    form?: any
    fieldName?: string
}




const MediaGalery = ({ post, editorField, fieldName }: IMediaGaleryProps) => {
    const dispatch = useAppDispatch();
    const {
        media,
        postMedia,
        selectedMedia
    } = useAppSelector(state => state.mediaGalery);
    const {
        onChangeUploadFiles,
        onClickSetFeaturedImage,
        onClickPasteMediaTag
    } = useMediaGalery({ editorField, fieldName })

    return (
        <div>
            <Tabs defaultValue="media">
                <TabsList className="flex">
                    <TabsTrigger
                        onClick={() => dispatch(setSelectedMedia(null))}
                        value="allmedia"
                    >
                        All Media
                    </TabsTrigger>
                    {post &&
                        <TabsTrigger
                            onClick={() => dispatch(setSelectedMedia(null))}
                            value="postmedia"
                        >
                            Post Media
                        </TabsTrigger>}
                    {post && <TabsTrigger
                        onClick={() => dispatch(setSelectedMedia(null))}
                        value="uploadmedia"
                    >
                        Upload media
                    </TabsTrigger>}

                </TabsList>

                {media && <TabsContent className="flex" value="allmedia">
                    <MediaList type='allMedia' />
                    {selectedMedia && <MediaEditor />}
                </TabsContent>}

                {postMedia && <TabsContent className="flex" value="postmedia">
                    <MediaList type='postMedia' />
                    {selectedMedia && <MediaEditor />}
                </TabsContent>}

                {post && <TabsContent className="flex" value="uploadmedia">
                    <input type="file" multiple onChange={(e) => onChangeUploadFiles(e)} />
                </TabsContent>}
            </Tabs>

        </div>
    )
}

export default MediaGalery