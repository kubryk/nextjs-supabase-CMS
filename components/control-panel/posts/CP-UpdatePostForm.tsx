'use client'
import { useRouter, useSearchParams } from "next/navigation";
//Components
import { Button } from "@/components/ui/button"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import useUpdatePostForm from "@/hooks/forms/useUpdatePostForm";
import createMediaPath from "@/utils/mediaPath";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MediaProvider from "@/providers/MediaProvider";
import MediaGalery from "../media-galery/MediaGalery";
import { PuffLoader } from "react-spinners";
import { fetchAuthors, fetchCategories, fetchFeaturedMedia, fetchPost, nullFeaturedMedia, nullPost } from "@/features/post/updatePostSlice";
import { FormProvider, useController } from "react-hook-form";
import RichEditor from "../rich-editor/RichEditor";
import { format } from 'date-fns'
import Link from "next/link";




const UpdatePostForm = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const postId = useSearchParams().get('id');

    //Якщо в посиланні немає ід переадресовуємо на сторінку всіх постів
    if (!postId) {
        router.push('/control-panel/posts')
        return <div>Post id not found</div>
    }

    //Форма
    const { form, onSubmit, onChangeFiles, onInvalid } = useUpdatePostForm(postId);
    //States
    const { loadings, post, featuredMedia, categories, authors, update } = useAppSelector(state => state.updatePost);

    return (
        <div>
            {post &&
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
                            <div className="flex">
                                <div className=" flex flex-col gap-4">
                                    <div className=" flex flex-col gap-2">
                                        <FormField
                                            // defaultValue={post.title}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input className=" w-[500px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            // defaultValue={post.title}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="meta_title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meta Title</FormLabel>
                                                    <FormDescription>50 - 60 chars</FormDescription>
                                                    <FormControl>
                                                        <Input className=" w-[500px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            // defaultValue={post.url}
                                            control={form.control}
                                            name="url"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Url</FormLabel>
                                                    <FormControl>
                                                        <Input className=" w-[500px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            // defaultValue={post.description}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea className=" h-[150px] w-[500px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            // defaultValue={post.description}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="meta_description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meta Description</FormLabel>
                                                    <FormDescription>120 - 158 chars</FormDescription>
                                                    <FormControl>
                                                        <Textarea className=" h-[80px] w-[500px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className=" flex flex-row gap-4">

                                        <FormField
                                            defaultValue={post.category}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <FormControl>
                                                        <div>
                                                            {loadings.categories && <PuffLoader />}
                                                            {categories &&
                                                                <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange}>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories && categories.map((category) => {
                                                                            return (
                                                                                <SelectItem
                                                                                    key={category.id}
                                                                                    value={category.id}
                                                                                >
                                                                                    {category.name}
                                                                                </SelectItem>
                                                                            )
                                                                        })}
                                                                    </SelectContent>
                                                                </Select>
                                                            }
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            defaultValue={post.author}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="author"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Author</FormLabel>
                                                    <FormControl>
                                                        <div>
                                                            {loadings.authors && <PuffLoader />}
                                                            {authors && <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange} >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {authors && authors.map((author) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={author.id}
                                                                                value={author.id}
                                                                            >
                                                                                {author.name}
                                                                            </SelectItem>)
                                                                    })}
                                                                </SelectContent>
                                                            </Select>}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            defaultValue={post.status}
                                            disabled={loadings.update}
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <FormControl>

                                                        <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="publish">Publish</SelectItem>
                                                                <SelectItem value="draft">Draft</SelectItem>
                                                                <SelectItem value="schedule">Schedule</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>


                                <div className=" flex flex-col items-center justify-start gap-2 pt-6">
                                    {/* <div className=" font-semibold text-sm">Featured Image</div> */}
                                    {loadings.featuredMedia && <PuffLoader />}
                                    {featuredMedia &&
                                        <Image
                                            quality={1}
                                            width={300}
                                            height={300}
                                            alt={featuredMedia.alt}
                                            src={`/media/${createMediaPath(featuredMedia).mediaPath}`}
                                        />
                                    }
                                    {<div>Created: {format(post.created_at, "PPpp")}</div>}
                                    {<div>Updated: {format(post.updated_at, "PPpp")}</div>}
                                    {<Link className=" text-blue-600" href={`/${post.url}`}>Go to post</Link>}
                                </div>
                            </div>


                            <div className=" flex flex-col gap-1">
                                <MediaProvider>
                                    <RichEditor post={post} fieldName={'content'} />
                                </MediaProvider>
                            </div>


                            <div className="flex justify-between">
                            </div>
                            <Button disabled={loadings.update}>Update</Button>
                        </form >
                    </Form >
                </div>
            }

        </div>
    );
}

export default UpdatePostForm;