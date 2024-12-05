'use client'
import Container from "@/components/Container";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuthorForm from "../../../hooks/forms/useAuthorForm";
import { Textarea } from "@/components/ui/textarea";
import { AuthorsType } from "@/types/global";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { HTMLAttributes, ReactNode, useCallback, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

// const thumbsContainer = {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 16
// };

// const thumb = {
//     display: 'inline-flex',
//     borderRadius: 2,
//     border: '1px solid #eaeaea',
//     marginBottom: 8,
//     marginRight: 8,
//     width: 100,
//     height: 100,
//     padding: 4,
//     boxSizing: 'border-box'
// };

// const thumbInner = {
//     display: 'flex',
//     minWidth: 0,
//     overflow: 'hidden'
// };

// const img = {
//     display: 'block',
//     width: 'auto',
//     height: '100%'
// };

interface AuthorFormProps extends HTMLAttributes<HTMLDivElement> {
    action: 'update' | 'create',
    authorId?: string
}


const AuthorForm = ({ action, authorId, className, ...rest }: AuthorFormProps) => {
    const { form, onSubmit } = useAuthorForm({ authorId, action });
    const { results, loadings, errors } = useAppSelector(state => state.updateAuthors);

    // const [files, setFiles] = useState([]);
    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: {
    //         'image/*': []
    //     },
    //     onDrop: acceptedFiles => {
    //         setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         })));
    //     }
    // });

    // const thumbs = files.map(file => (
    //     <div style={thumb} key={file.name}>
    //         <div style={thumbInner}>
    //             <img
    //                 src={file.preview}
    //                 style={img}
    //                 // Revoke data uri after image is loaded
    //                 onLoad={() => { URL.revokeObjectURL(file.preview) }}
    //             />
    //         </div>
    //     </div>
    // ));

    // useEffect(() => {
    //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    //     return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, []);

    return (
        <div {...rest} className={cn('p-3 border-[2px] border-gray-200', className)}>
            {/* {loadings.fetch && <PuffLoader />} */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="whois"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Whois</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="h-[100px]"  {...field} />
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
                                <FormLabel>url</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside style={thumbsContainer}>
                            {thumbs}
                        </aside>
                    </section> */}

                    <Button type="submit">{action === 'create' ? 'Create' : 'Update'}</Button>
                </form>
            </Form>



        </div>
    );
}

export default AuthorForm;