import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { ChangeEvent, RefObject, useEffect } from "react";
import { saveMediaLocaly, saveMediaInDb } from "@/features/media/createMediaSlice";
import { fetchAllMedia, fetchPostMedia, setMediaGaleryPost, setSelectedMedia } from "@/features/media/MediaGalerySlice";
import { fetchFeaturedMedia, nullFeaturedMedia } from "@/features/post/updatePostSlice";
import { useForm } from "react-hook-form";
import useRichEditor from "./rich-editor/useRichEditor";

const useMediaGalery = ({ editorField, fieldName, form }: { editorField: RefObject<HTMLTextAreaElement>, fieldName: string, form: any }) => {
    const dispatch = useAppDispatch();

    const { selectedMedia } = useAppSelector(state => state.mediaGalery);
    const { post } = useAppSelector(state => state.updatePost);
    const richEditor = useRichEditor();


    useEffect(() => {
        //Фетчимо всі медіа
        dispatch(fetchAllMedia())

        //Якщо є пост фетчимо медіа загружені до поста
        if (post) {
            dispatch(setMediaGaleryPost(post.id))
            dispatch(fetchPostMedia(post.id))
        }
    }, [])

    //Хендлер завантаження медіа
    const onChangeUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (post && files) {
            for (let index = 0; index < files.length; index++) {
                const testFormData = new FormData();
                testFormData.append('media', files[index])
                dispatch(saveMediaLocaly(testFormData))
                dispatch(saveMediaInDb({ name: files[index].name, uploaded_to: post.id }))
            }
            dispatch(fetchAllMedia())
            dispatch(fetchPostMedia(post.id))
        }
    }

    //Хендлер зміни featured image поста
    const onClickSetFeaturedImage = () => {
        if (selectedMedia) {

            form.setValue('featured_image', selectedMedia.id);
            dispatch(setSelectedMedia(null));
            dispatch(nullFeaturedMedia());
            dispatch(fetchFeaturedMedia(form.getValues('featured_image')))
        }
    }

    //Хендлер вставлення html тегу media
    const onClickPasteMediaTag = () => {
        if (editorField && fieldName && selectedMedia) {
            richEditor.pasteMedia({
                textAreaRef: editorField,
                formFieldName: fieldName,
                media: selectedMedia
            })
        }
    }

    return { onChangeUploadFiles, onClickSetFeaturedImage, onClickPasteMediaTag }
}

export default useMediaGalery