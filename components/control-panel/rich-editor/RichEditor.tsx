'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import MediaGalery from "../media-galery/MediaGalery";
import { useRef } from "react";
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { fetchAllMedia } from "@/features/media/MediaGalerySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { PostType } from "@/types/global";
import useMediaGalery from "../../../hooks/useMediaGalery";
import { DialogTriggerProps } from "@radix-ui/react-dialog";


const RichEditor = ({ fieldName, post }: { fieldName: string, post: PostType }) => {
    const dispatch = useAppDispatch();
    const form = useFormContext();

    const editorFieldRef = useRef<HTMLTextAreaElement | null>(null);
    const { selectedMedia } = useAppSelector(state => state.mediaGalery);
    const {
        onChangeUploadFiles,
        onClickSetFeaturedImage,
        onClickPasteMediaTag
    } = useMediaGalery({ editorField: editorFieldRef, fieldName, form })

    return (

        <div className="flex flex-col">
            {/* {createPortal( */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={() => dispatch(fetchAllMedia())} variant="outline">
                        Media
                    </Button>
                </DialogTrigger>
                <DialogContent className=" min-w-[90%] min-h-[650px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <MediaGalery post={post} editorField={editorFieldRef} fieldName={fieldName} />
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <div className="flex gap-4">
                                {/* Кнопка вставлення тегу фото */}
                                {form && editorFieldRef && selectedMedia && fieldName &&
                                    <Button onClick={onClickPasteMediaTag}>
                                        Add media
                                    </Button>}

                                {/* Кнопка зміни featured image */}
                                {post && selectedMedia &&
                                    <Button onClick={onClickSetFeaturedImage}>
                                        Set Featured Image
                                    </Button>
                                }
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>,
            {/* document.body
            )} */}


            <FormField
                // disabled={loadings.update}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea defaultValue={field.value} className=" h-[600px] w-[1000px]" {...field} ref={editorFieldRef} />
                        </FormControl>
                        <FormDescription>
                            This is post content.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div >

    );
}


export default RichEditor;
