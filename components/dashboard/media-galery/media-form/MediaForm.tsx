import useUpdateMediaForm from "./useUpdateMediaForm";
import createMediaPath from "@/lib/mediaPath";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteMediaFromDb, deleteMediaFromServer } from "@/features/media/deleteMediaSlice";
import { fetchAllMedia, fetchPostMedia, setSelectedMedia } from "@/features/media/MediaGalerySlice";



const MediaForm = () => {
    const { selectedMedia, mediaGaleryPost } = useAppSelector(state => state.mediaGalery);
    const dispatch = useAppDispatch();
    const { form, onSubmit, onInvalid } = useUpdateMediaForm();

    if (!selectedMedia) return null

    // const selectedMediaTags = JSON.parse(selectedMedia.tags);

    const { mediaPath } = createMediaPath(selectedMedia);

    const deleteMediaOnClick = () => {
        //Видалення медіа з диска
        dispatch(deleteMediaFromServer(`./public/media/` + mediaPath))
        //Видалення медіа з бази
        dispatch(deleteMediaFromDb(selectedMedia.id))
        //Очищаєм змінну вибраного медіа
        dispatch(setSelectedMedia(null))
        //Фетчим всі медіа заново
        dispatch(fetchAllMedia());
        //Фетчимо медіа загружені для поста
        if (mediaGaleryPost) dispatch(fetchPostMedia(mediaGaleryPost));
    }

    return (

        <div className=" h-[calc(100vh-50px)] min-w-[300px]  overflow-auto p-3 border-l-[2px] border-gray-200">
            {selectedMedia &&
                <div className="flex flex-col items-center justify-center gap-3">
                    <Image
                        className="rounded-lg"
                        key={selectedMedia.id}
                        alt={selectedMedia.alt}
                        src={`/media/${mediaPath}`}
                        width={300}
                        height={300}
                    />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-2 w-full">

                            <FormField
                                disabled
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is media file name.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                disabled
                                control={form.control}
                                name="uploaded_to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} onBlur={form.handleSubmit(onSubmit)} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is the post for witch media was uploaded.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="alt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alt</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} onBlur={form.handleSubmit(onSubmit)} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is media alt.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caption"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Caption</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} onBlur={form.handleSubmit(onSubmit)} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is media caption.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} onBlur={form.handleSubmit(onSubmit)} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is media description.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input className=" bg-white" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {/* <div className=" flex flex-col gap-1">
                                                <div className=" flex gap-1 flex-wrap max-w-[200px]">
                                                    {selectedMedia.tags && selectedMediaTags.map((tag: string, index: number) => {
                                                        return (
                                                            <div className=" bg-green-300 rounded-lg p-1 cursor-pointer hover:bg-red-500">
                                                                {tag}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <Button onSubmit={(e) => console.log('message')}>Add tag</Button>
                                            </div> */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <div className="flex gap-7 justify-center">
                                <Button
                                    variant={'destructive'}
                                    onClick={(e) => deleteMediaOnClick()}
                                >
                                    Delete
                                </Button>
                            </div>


                        </form>
                    </Form>
                </div>
            }
        </div>
    );
}



export default MediaForm;