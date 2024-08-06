import { nullable, z } from "zod";

export const postFormSchema = z.object({
    title: z.string().min(10, { message: "Title must be at least 10 characters.", }),
    meta_title: z.string().min(10, { message: "Meta Title must be at least 10 characters.", }),
    description: z.string().min(2, { message: "Description must be at least 2 characters.", }),
    meta_description: z.string().min(2, { message: "Meta Description must be at least 2 characters.", }),
    content: z.string().min(2, { message: "Content must be at least 2 characters.", }),
    category: z.string().min(2, { message: "Category must be at least 2 characters.", }),
    author: z.string().min(2, { message: "Author must be at least 2 characters.", }),

    url: z.string().min(2, { message: "Url must be at least 2 characters.", }).toLowerCase().refine(s => !s.includes(' '), 'Spaces in url is not allowed.'),

    status: z.string().min(2, { message: "Status must be at least 2 characters.", }),
    media: z.any(),
    featured_image: z.string()
})


export const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
})


export const categoryFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters.", }),
    url: z.string().min(2, { message: "Url must be at least 2 characters.", }).toLowerCase().refine(s => !s.includes(' '), 'Spaces in url is not allowed.'),

})


export const mediaFormSchema = z.object({
    alt: z.string(),
    description: z.string(),
    caption: z.string(),
    name: z.string().optional(),
    uploaded_to: z.string().optional(),

})