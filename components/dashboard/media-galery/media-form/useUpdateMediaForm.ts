import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { mediaFormSchema } from "@/schemas/formSchemas";
import { useEffect } from "react";

//Redux
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchAllMedia, fetchPostMedia } from "@/features/media/MediaGalerySlice";
import { updateMedia } from "@/features/media/updateMediaSlice";



const useUpdateMediaForm = () => {
    const { selectedMedia, mediaGaleryPost } = useAppSelector(state => state.mediaGalery);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (selectedMedia) {
            form.reset({
                alt: selectedMedia.alt ? selectedMedia.alt : '',
                description: selectedMedia.description,
                caption: selectedMedia.caption,
                name: selectedMedia.name,
                uploaded_to: selectedMedia.uploaded_to,
                tags: selectedMedia.tags
            })
        }
    }, [selectedMedia])


    const form = useForm<z.infer<typeof mediaFormSchema>>({
        resolver: zodResolver(mediaFormSchema),
        mode: "onChange",
    });


    const onSubmit = async (data: any) => {
        console.log(data)
        if (selectedMedia) {
            //Апдейт медіа
            dispatch(updateMedia({ data, mediaId: selectedMedia.id }));
            //Фетчимо всі медіа знову
            dispatch(fetchAllMedia());
            //Фетчимо медіа загружені до поста
            if (mediaGaleryPost) dispatch(fetchPostMedia(mediaGaleryPost));

        }
    };

    const onInvalid = (errors: any) => {
        console.log(errors)
    }
    return { form, onSubmit, onInvalid };
};

export default useUpdateMediaForm;
