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
import useUpdatePostForm from "./useUpdatePostForm";
import createMediaPath from "@/lib/mediaPath";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MediaProvider from "@/providers/MediaProvider";
import MediaGalery from "../media-galery/MediaGalery";
import { PuffLoader } from "react-spinners";
import { fetchAuthors, fetchCategories, fetchFeaturedMedia, fetchPost, nullFeaturedMedia, nullPost } from "@/features/post/updatePostSlice";
import { FormProvider, useController } from "react-hook-form";
import RichEditor from "../media-galery/rich-editor/RichEditor";
import { add, format, formatISO, formatISO9075 } from 'date-fns'
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton"
import { DevTool } from "@hookform/devtools";


const UpdatePostForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const postId = useSearchParams().get('id');

    //Якщо в посиланні немає ід переадресовуємо на сторінку всіх постів
    if (!postId) {
        router.push('/dashboard/posts')
        return <div>Post id not found</div>
    }

    //Форма
    const { form, onSubmit, onChangeFiles, onInvalid } = useUpdatePostForm(postId);
    //States
    const { loadings, post, featuredMedia, categories, authors, update } = useAppSelector(state => state.updatePost);

    const [time, setTime] = useState<string>('00:00:00');


    return (
        <div className=" w-full">
            {post &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} >
                        <div className="flex gap-6 p-4">
                            <div className="flex flex-col flex-1 p-4 gap-5 bg-gray-100 rounded-md">
                                <FormField
                                    disabled={loadings.update}
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('title').isDirty ? 'bg-orange-300' : ''}>Title</FormLabel>
                                            <FormControl className='bg-white'>
                                                <Input className=" w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={loadings.update}
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('description').isDirty ? 'bg-orange-300' : ''}>
                                                Description {form.getFieldState('description').isDirty ? '(Updated)' : null}
                                            </FormLabel>
                                            <FormControl className='bg-white'>
                                                <Textarea className=" h-[80px] w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <MediaProvider>
                                    <RichEditor post={post} fieldName={'content'} />
                                </MediaProvider>


                                <FormField
                                    disabled={loadings.update}
                                    control={form.control}
                                    name="meta_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('meta_title').isDirty ? 'bg-orange-300' : ''}>Meta Title</FormLabel>
                                            <FormDescription>50 - 60 chars</FormDescription>
                                            <FormControl className=" bg-white">
                                                <Input className=" w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={loadings.update}
                                    control={form.control}
                                    name="meta_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('meta_description').isDirty ? 'bg-orange-300' : ''}>Meta Description</FormLabel>
                                            <FormDescription>120 - 158 chars</FormDescription>
                                            <FormControl className=" bg-white">
                                                <Textarea className=" h-[80px] w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('url').isDirty ? 'bg-orange-300' : ''}>Url</FormLabel>
                                            <FormControl className=" bg-white">
                                                <Input className=" w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>






                            <div className="flex flex-col flex-none gap-4 w-[350px] p-3 rounded-xl bg-gray-100">
                                <div className="flex justify-center gap-4 items-center">
                                    <Button className="flex-1" disabled={loadings.update}>Update</Button>
                                    <Button className="flex-1" variant={'destructive'} disabled>Delete</Button>
                                </div>


                                <div className="flex gap-2 w-full justify-around border-[1px] p-[2px] rounded-md">
                                    <div className=" text-[10px]">Add: {format(post.created_at, "Pp")}</div>
                                    <div className=" text-[10px]">Upd: {format(post.updated_at, "Pp")}</div>
                                </div>
                                {loadings.featuredMedia && <Skeleton className="h-[300px] w-[300px] rounded-xl mx-auto" />}
                                {featuredMedia &&
                                    <Image
                                        className="mx-auto animate-in zoom-in duration-200 rounded-xl"
                                        quality={1}
                                        width={300}
                                        height={300}
                                        alt={featuredMedia.alt}
                                        src={`/media/${createMediaPath(featuredMedia).mediaPath}`}
                                    />
                                }

                                <FormField
                                    defaultValue={post.status}
                                    disabled={loadings.update}
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={form.getFieldState('status').isDirty ? 'bg-orange-300' : ''}>Status</FormLabel>
                                            <FormControl >

                                                <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full bg-white">
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

                                {form.watch('status') === 'schedule' &&
                                    <FormField
                                        defaultValue={post.status}
                                        disabled={loadings.update}
                                        control={form.control}
                                        name="scheduled_at"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-center p-2 rounded-md border-[1px] bg-blue-100 animate-in zoom-in duration-200">
                                                <FormControl>
                                                    <div className="flex items-center justify-between">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "flex-none w-[200px] text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? <span className=" text-[12px]">{format(field.value, 'P')}</span> : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <Calendar
                                                                    mode='single'
                                                                    selected={field.value ? new Date(field.value) : new Date()}
                                                                    onSelect={(day) => {
                                                                        if (day) {
                                                                            console.log(formatISO(day, { representation: 'date' }) + 'T' + time)
                                                                            field.onChange(formatISO(day, { representation: 'date' }) + 'T' + time)
                                                                        }
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>

                                                        <Select
                                                            defaultValue={field.value ? formatISO9075(field.value, { representation: 'time' }) : "00:00:00"}
                                                            disabled={loadings.update}
                                                            onValueChange={(e) => {
                                                                setTime(e)
                                                                const date = form.getValues('scheduled_at')
                                                                { date && form.setValue('scheduled_at', formatISO(date, { representation: 'date' }) + 'T' + e) }

                                                            }}>
                                                            <SelectTrigger className="w-[100px] bg-white">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent defaultValue={field.value ? formatISO9075(field.value, { representation: 'time' }) : "00:00:00"} className=" text-[12px]">
                                                                <SelectItem value="00:00:00"><span className="text-[12px]">00:00</span></SelectItem>
                                                                <SelectItem value="01:00:00"><span className="text-[12px]">01:00</span></SelectItem>
                                                                <SelectItem value="02:00:00"><span className="text-[12px]">02:00</span></SelectItem>
                                                                <SelectItem value="03:00:00"><span className="text-[12px]">03:00</span></SelectItem>
                                                                <SelectItem value="04:00:00"><span className="text-[12px]">04:00</span></SelectItem>
                                                                <SelectItem value="05:00:00"><span className="text-[12px]">05:00</span></SelectItem>
                                                                <SelectItem value="06:00:00"><span className="text-[12px]">06:00</span></SelectItem>
                                                                <SelectItem value="07:00:00"><span className="text-[12px]">07:00</span></SelectItem>
                                                                <SelectItem value="08:00:00"><span className="text-[12px]">08:00</span></SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                }


                                {loadings.categories ? <PuffLoader className=" mx-auto" /> :
                                    <FormField
                                        defaultValue={post.category}
                                        disabled={loadings.update}
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={form.getFieldState('category').isDirty ? 'bg-orange-300' : ''}>Category</FormLabel>
                                                <FormControl>
                                                    <div>

                                                        {categories &&
                                                            <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange}>
                                                                <SelectTrigger className="w-full bg-white">
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
                                    />}

                                {loadings.authors ? <PuffLoader className="mx-auto" /> :
                                    <FormField
                                        defaultValue={post.author}
                                        disabled={loadings.update}
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={form.getFieldState('author').isDirty ? 'bg-orange-300' : ''}>Author</FormLabel>
                                                <FormControl>
                                                    <div>

                                                        {authors && <Select defaultValue={field.value} disabled={loadings.update} onValueChange={field.onChange} >
                                                            <SelectTrigger className="w-full bg-white">
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
                                    />}




                            </div>
                        </div>

                    </form>
                </Form>
            }
            <DevTool control={form.control} />
        </div>
    )
}

export default UpdatePostForm;