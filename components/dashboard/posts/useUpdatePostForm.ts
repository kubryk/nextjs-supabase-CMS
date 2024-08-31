import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//Actions
import { fetchCategoriesAction } from "@/actions/Category-Actions";
import { fetchAuthorsAction } from "@/actions/Author-Actions";
// import { addMediaAction, fetchMediaByIdAction, fetchMediasAction, saveMediaLocalyAction } from "@/actions/Media-Actions";

//Schemas Types
import { postFormSchema } from "@/schemas/formSchemas";
import { AuthorsType, MediaType, PostCategoryType, PostDataType, PostType } from "@/types/global";

//Hooks
import useServerAction from "../../../hooks/useServerAction";
import useEditor from "../media-galery/rich-editor/useRichEditor";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { fetchAuthors, fetchCategories, fetchFeaturedMedia, fetchPost, nullFeaturedMedia, nullPost, updatePost } from "@/features/post/updatePostSlice";
import { createMediaAction, saveMediaLocalyAction } from "@/actions/Media-Actions";
import { useRouter } from "next/navigation";



const useUpdatePostForm = (postId: string) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loadings, post, featuredMedia, categories, authors, update } = useAppSelector(state => state.updatePost);
    const [updateDate, setUpdateDate] = useState(new Date().toISOString());


    useEffect(() => {
        //Фетчимо пост
        dispatch(fetchPost(postId))

        //Фетчимо категорії та автори якщо відсутні  
        if (!categories) dispatch(fetchCategories())
        if (!authors) dispatch(fetchAuthors())

        //Обнуляємо featured media та медіа
        return () => {
            dispatch(nullPost())
            dispatch(nullFeaturedMedia())
        }
    }, [])

    useEffect(() => {
        //Фетчимо featured media поста 
        if (post) {
            dispatch(fetchFeaturedMedia(post.featured_image))
        }
    }, [post])



    const form = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        mode: 'onChange',
        values: post ? {
            title: post.title,
            meta_title: post.meta_title,
            url: post.url,
            description: post.description,
            meta_description: post.meta_description,
            category: post.category,
            author: post.author,
            status: post.status,
            content: post.content,
            featured_image: post.featured_image,
            updated_at: updateDate,
            scheduled_at: post.scheduled_at
        } : undefined
    });

    useEffect(() => {
        if (form.watch('status') !== 'schedule') form.setValue('scheduled_at', null)
    }, [form.watch('status')])



    //Хендлер завантаження медіа
    const onChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            for (let index = 0; index < files.length; index++) {
                const testFormData = new FormData();
                testFormData.append('media', files[index])
                await saveMediaLocalyAction(testFormData)
                await createMediaAction({ name: files[index].name, uploaded_to: postId })
            }
        }
    }

    const onInvalid = (errors: any) => {
        console.log(errors)
    }


    //хендлер сабміту форми
    const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
        console.log(data)
        dispatch(updatePost({ data, postId }))
        // if (!update?.error) window.location.reload()
    }
    return { form, onSubmit, onChangeFiles, onInvalid };
}

export default useUpdatePostForm;
