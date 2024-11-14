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
import MediaGalery from "../MediaGalery";
import { useRef } from "react";
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { fetchAllMedia } from "@/features/media/MediaGalerySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { PostType } from "@/types/global";
import useMediaGalery from "../useMediaGalery";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { RiImageAddLine } from "react-icons/ri";


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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className=" w-[75px]" onClick={() => dispatch(fetchAllMedia())} variant="outline">
                        <RiImageAddLine color="yellowgreen" size={25} />
                    </Button>
                </DialogTrigger>

                <DialogContent className=" max-w-[90%] h-[80%] overflow-auto ">
                    <div className=" h-[500px] pb-4">
                        <MediaGalery post={post} editorField={editorFieldRef} fieldName={fieldName} />
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <div className="flex gap-4">
                                {/* Кнопка вставки фото у тектову область */}
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
            </Dialog>



            <FormField
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormControl className=" bg-white">
                            <Textarea defaultValue={field.value} className=" h-[600px] w-full overflow-x-auto" {...field} ref={editorFieldRef} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div >

    );
}


export default RichEditor;
