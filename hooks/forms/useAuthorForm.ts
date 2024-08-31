'use client'
import { createSingleAuthorAction, updateAuthorAction } from "@/actions/Author-Actions"
import { createAuthor } from "@/features/authors/createAuthorSlice"
import { fetchUpdatingAuthor, updateAuthor } from "@/features/authors/updateAuthorSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { AuthorsType } from "@/types/global"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const useAuthorForm = ({ authorId, action }: { authorId?: string, action: "update" | "create" }) => {
    const dispatch = useAppDispatch();
    const { results, loadings, errors } = useAppSelector(state => state.updateAuthors);

    useEffect(() => {
        form.reset()
        if (authorId && action === 'update') {
            dispatch(fetchUpdatingAuthor(authorId));
        }
    }, [])



    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        whois: z.string().min(2, { message: "Name must be at least 2 characters." }),
        description: z.string().min(2, { message: "Name must be at least 2 characters." }),
        url: z.string().min(2, { message: "Url must be at least 2 characters.", }).toLowerCase().refine(s => !s.includes(' '), 'Spaces in url is not allowed.'),
        photo: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: results.fetch ? {
            name: results.fetch.name,
            whois: results.fetch.whois,
            description: results.fetch.description,
            url: results.fetch.url,
            photo: results.fetch.photo,
        } : {
            name: 'Jhon Doe',
            whois: 'Tattoo artist',
            description: 'Best tattoo artist in the world',
            url: 'jhon-doe',
            photo: '55df49fc-816d-4ec3-8fef-73995ba356f7'
        },
        mode: "onChange",
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (action === 'create') {
            dispatch(createAuthor(data))
            return
        }
        if (authorId && action === 'update') {
            dispatch(updateAuthor({ id: authorId, data }))
            return
        }
    }

    return { form, onSubmit }
}

export default useAuthorForm;