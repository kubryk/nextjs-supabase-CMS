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

            {/* <div className="flex gap-4">
                {form && editorField && selectedMedia && fieldName &&
                    <Button onClick={onClickPasteMediaTag}>
                        Add media
                    </Button>}

                {post && selectedMedia &&
                    <Button onClick={onClickSetFeaturedImage}>
                        Set Featured Image
                    </Button>
                }
            </div> */}
        </div>
    )
}

// const MediaGalery = ({ post, editorField, fieldName }: IMediaGaleryProps) => {
//     const { media, postMedia, selectedMedia } = useAppSelector(state => state.mediaGalery);
//     const dispatch = useAppDispatch();
//     const form = useFormContext();
//     const richEditor = useEditor();

//     useEffect(() => {
//         dispatch(fetchAllMedia())
//         // if (post) {
//         //     dispatch(setMediaGaleryPost(post.id))
//         //     dispatch(fetchPostMedia(post.id))
//         // }
//     }, [])

//     // //Хендлер завантаження медіа
//     // const onChangeUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
//     //     const files = e.target.files;
//     //     if (post && files) {
//     //         for (let index = 0; index < files.length; index++) {
//     //             const testFormData = new FormData();
//     //             testFormData.append('media', files[index])
//     //             dispatch(saveMediaLocaly(testFormData))
//     //             dispatch(saveMediaInDb({ name: files[index].name, uploaded_to: post.id }))
//     //         }
//     //         dispatch(fetchAllMedia())
//     //         dispatch(fetchPostMedia(post.id))
//     //     }
//     // }

//     // //Хендлер зміни featured image поста
//     // const onClickSetFeaturedImage = () => {
//     //     form.setValue('featured_image', selectedMedia.id)
//     //     dispatch(setSelectedMedia(null));
//     //     dispatch(fetchFeaturedMedia(selectedMedia.id))
//     // }

//     //Хендлер вставлення html тегу media
//     const onClickPasteMediaTag = () => {
//         if (editorField && fieldName && selectedMedia) {
//             richEditor.pasteMedia({
//                 textAreaRef: editorField,
//                 formFieldName: fieldName,
//                 media: selectedMedia
//             })
//         }
//     }

//     return (
//         <div>
//             <Dialog>
//                 <DialogTrigger asChild>
//                     <Button onClick={() => dispatch(fetchAllMedia())} variant="outline">
//                         Media
//                     </Button>
//                 </DialogTrigger>
//                 <DialogContent className=" min-w-[90%] min-h-[650px]">
//                     <DialogHeader>
//                         <DialogTitle></DialogTitle>
//                         <DialogDescription></DialogDescription>
//                     </DialogHeader>
//                     <Tabs defaultValue="media">

//                         <TabsList className="flex">
//                             <TabsTrigger
//                                 onClick={() => dispatch(setSelectedMedia(null))}
//                                 value="allmedia"
//                             >
//                                 All Media
//                             </TabsTrigger>
//                             {/* {post &&
//                                 <TabsTrigger
//                                     onClick={() => dispatch(setSelectedMedia(null))}
//                                     value="postmedia"
//                                 >
//                                     Post Media
//                                 </TabsTrigger>}

//                             <TabsTrigger
//                                 onClick={() => dispatch(setSelectedMedia(null))}
//                                 value="uploadmedia"
//                             >
//                                 Upload media
//                             </TabsTrigger> */}
//                         </TabsList>

//                         {media && <TabsContent className="flex" value="allmedia">
//                             <MediaList type='allMedia' />
//                             {selectedMedia && <MediaEditor />}
//                         </TabsContent>}

//                         {/* {postMedia && <TabsContent className="flex" value="postmedia">
//                             <MediaList type='postMedia' />
//                             {selectedMedia && <MediaEditor />}
//                         </TabsContent>}

//                         {post && <TabsContent className="flex" value="uploadmedia">
//                             <input type="file" multiple onChange={(e) => onChangeUploadFiles(e)} />
//                         </TabsContent>} */}
//                     </Tabs>

//                     <DialogFooter className="sm:justify-start">
//                         <DialogClose asChild>
//                             <div className="flex gap-4">
//                                 {/* Кнопка вставлення тегу фото */}
//                                 {form && editorField && selectedMedia && fieldName &&
//                                     <Button onClick={onClickPasteMediaTag}>
//                                         Add media
//                                     </Button>}

//                                 {/* Кнопка зміни featured image */}
//                                 {/* {form && post && selectedMedia &&
//                                     <Button onClick={onClickSetFeaturedImage}>
//                                         Set Featured Image
//                                     </Button>
//                                 } */}
//                             </div>
//                         </DialogClose>
//                     </DialogFooter>

//                 </DialogContent>
//             </Dialog>

//         </div>
//     )
// }

export default MediaGalery