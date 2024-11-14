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
import MediaList from "./media-list/MediaList"
import MediaForm from "./media-form/MediaForm"
import { PostType } from "@/types/global"
import useMediaGalery from "./useMediaGalery"


interface IMediaGaleryProps {
    post?: PostType | null
    editorField?: RefObject<HTMLTextAreaElement>
    form?: any
    fieldName?: string
}


const MediaGalery = ({ post, editorField, form, fieldName = "" }: IMediaGaleryProps) => {
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
    } = useMediaGalery({ editorField: editorField!, fieldName, form })

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

                {media &&
                    <TabsContent className="flex" value="allmedia">
                        <MediaList type='allMedia' />
                        {selectedMedia && <MediaForm />}
                    </TabsContent>
                }

                {postMedia &&
                    <TabsContent className="flex" value="postmedia">
                        <MediaList type='postMedia' />
                        {selectedMedia && <MediaForm />}
                    </TabsContent>
                }

                {post &&
                    <TabsContent className="flex" value="uploadmedia">
                        <input type="file" multiple onChange={(e) => onChangeUploadFiles(e)} />
                    </TabsContent>
                }
            </Tabs>

        </div>
    )
}

export default MediaGalery