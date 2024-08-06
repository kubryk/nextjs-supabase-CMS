'use client'
import useServerAction from "@/hooks/useServerAction";
import { PostDataType, PostType } from "@/types/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../../ui/button";
import { createSinglePostAction } from "@/actions/Post-Actions";

const CreatePost = () => {

    const router = useRouter();

    const addPost = useServerAction<PostType[], PostDataType>({
        action: createSinglePostAction,
        toast: true,
        successMessage: 'Post has been added',
        loadingMessage: 'Loading adding post'
    });

    const defaultValues = {
        title: "New post title - TattoosPicker",
        description: "Post description",
        content: "Post content",
        category: "93760f78-082a-4ef3-b875-fbfe07edf938",
        author: "8845f57b-234e-43fd-a628-43b195d121a5",
        url: uuidv4(),
        status: "draft",
        featured_image: 'dfdb449a-6bc5-45c3-bab5-a2cf9bc357c8'
    }

    const bigPost = {
        title: "30 Best Scorpio Tattos - TattoosPicker",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
        category: "93760f78-082a-4ef3-b875-fbfe07edf938",
        author: "8845f57b-234e-43fd-a628-43b195d121a5",
        url: uuidv4(),
        status: "publish",
        featured_image: 'dfdb449a-6bc5-45c3-bab5-a2cf9bc357c8'
    }

    useEffect(() => {
        if (addPost.data) return router.push(`/control-panel/posts/update?id=${addPost.data[0].id}`);
    }, [addPost.data])

    if (addPost.isLoading) return <PuffLoader />
    return (
        <>
            <Button onClick={() => addPost.useAction(defaultValues)}>Create default post</Button>
            <Button onClick={() => addPost.useAction(bigPost)}>Create big post</Button>
        </>
    )

}

export default CreatePost;