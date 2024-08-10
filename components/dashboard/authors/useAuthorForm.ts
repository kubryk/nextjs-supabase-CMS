'use client'
import { updateAuthorAction } from "@/actions/Author-Actions"
import { AuthorsType } from "@/types/global"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const useAuthorForm = (author: AuthorsType) => {

    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        whois: z.string().min(2, { message: "Name must be at least 2 characters." }),
        description: z.string().min(2, { message: "Name must be at least 2 characters." }),
        url: z.string().min(2, { message: "Url must be at least 2 characters.", }).toLowerCase().refine(s => !s.includes(' '), 'Spaces in url is not allowed.'),
        photo: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: author ? {
            name: author.name,
            whois: author.whois,
            description: author.description,
            url: author.url,
            photo: author.photo,
        } : undefined,
        mode: "onChange",
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        const updatedAuthor = await updateAuthorAction(author.id, data);
        console.log(updatedAuthor)
    }

    return { form, onSubmit }
}

export default useAuthorForm;