'use client'
import { PostDataType, PostType } from "@/types/global";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createPost } from "@/features/post/createPostSlice";
import { cn } from "@/lib/utils";

const draftedPost = {
    created_by: '2d54e7e3-0078-47d9-a6d3-0eaaa4d18911',
    title: "New post title - TattoosPicker",
    meta_title: 'Post seo title',
    description: "Post description",
    meta_description: 'Post seo description',
    content: "Post content",
    category: "93760f78-082a-4ef3-b875-fbfe07edf938",
    author: "8845f57b-234e-43fd-a628-43b195d121a5",
    url: uuidv4(),
    status: "draft",
    featured_image: 'dfdb449a-6bc5-45c3-bab5-a2cf9bc357c8'
}

const publishedPost = {
    created_by: '2d54e7e3-0078-47d9-a6d3-0eaaa4d18911',
    title: "30 Best Scorpio Tattos - TattoosPicker",
    meta_title: 'Post seo title',
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
    meta_description: 'Post seo description',
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
    category: "93760f78-082a-4ef3-b875-fbfe07edf938",
    author: "8845f57b-234e-43fd-a628-43b195d121a5",
    url: uuidv4(),
    status: "publish",
    featured_image: 'dfdb449a-6bc5-45c3-bab5-a2cf9bc357c8'
}

const scheduledPost = {
    created_by: '2d54e7e3-0078-47d9-a6d3-0eaaa4d18911',
    title: "Scheduled Post - TattoosPicker",
    meta_title: 'Post seo title',
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
    meta_description: 'Post seo description',
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad id distinctio sed, architecto obcaecati voluptatem, mollitia debitis nesciunt fugiat rem incidunt ipsa nostrum est molestias alias dignissimos, consectetur in.",
    category: "93760f78-082a-4ef3-b875-fbfe07edf938",
    author: "8845f57b-234e-43fd-a628-43b195d121a5",
    url: uuidv4(),
    status: "schedule",
    featured_image: 'dfdb449a-6bc5-45c3-bab5-a2cf9bc357c8'
}

interface CreatePostTemplatesProps extends HTMLAttributes<HTMLDivElement> {
    created_by: string;
}

const CreatePostTemplates = ({ created_by, className, ...rest }: CreatePostTemplatesProps) => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { result, loading, error } = useAppSelector(state => state.createPost);

    const createPostHandler = (post: PostDataType) => {
        dispatch(createPost(post));
        if (result) {
            router.push(`/dashboard/posts/update?id=${result.id}`);
        }
    }


    return (
        <div {...rest} className={cn("flex flex-col gap-5", className)}>
            <h1 className="font-bold text-xl">Post templates</h1>
            <div className="flex flex-col gap-2">
                <Button onClick={() => createPostHandler({ ...draftedPost })}>Draft</Button>
                <Button onClick={() => createPostHandler({ ...publishedPost })}>Published post</Button>
                <Button onClick={() => createPostHandler({ ...scheduledPost })}>Scheduled post</Button>

            </div>
        </div>
    )

}

export default CreatePostTemplates;