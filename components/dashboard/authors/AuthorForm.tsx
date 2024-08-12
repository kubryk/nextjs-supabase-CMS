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
import useAuthorForm from "./useAuthorForm";
import { Textarea } from "@/components/ui/textarea";
import { AuthorsType } from "@/types/global";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";

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


const AuthorForm = ({ action, authorId }: { action: 'update' | 'create', authorId?: string }) => {
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
        <Container>
            {/* {loadings.fetch && <PuffLoader />} */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is author public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="whois"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is author public display name.
                                </FormDescription>
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
                                    <Textarea className="w-[500px] h-[100px]"  {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is author public display name.
                                </FormDescription>
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
                                <FormDescription>
                                    This is author public display name.
                                </FormDescription>
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

                    <Button type="submit">Submit</Button>
                </form>
            </Form>



        </Container>
    );
}

export default AuthorForm;