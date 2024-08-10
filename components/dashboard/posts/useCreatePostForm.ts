import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

//Schemas Types
import { postFormSchema } from "@/schemas/formSchemas";
import { AuthorsType, PostCategoryType, PostDataType, PostType } from "@/types/global";

//actions
import useServerAction from "../../../hooks/useServerAction";
import { fetchCategoriesAction } from "@/actions/Category-Actions";
import { fetchAuthorsAction } from "@/actions/Author-Actions";
import { addPosttAction } from "@/actions/Post-Actions";

const useAddPostForm = () => {
  const router = useRouter();
  const addPost = useServerAction<PostType[], PostDataType>({
    action: addPosttAction,
    toast: true,
    successMessage: 'Post has been added',
    loadingMessage: 'Loading adding post'
  });
  const categories = useServerAction<PostCategoryType[], undefined>({
    action: fetchCategoriesAction,
  });
  const authors = useServerAction<AuthorsType[], undefined>({
    action: fetchAuthorsAction
  });

  useEffect(() => {
    categories.useAction();
    authors.useAction();
  }, []);


  //Якщо пост створено переадресовуємо на редагування поста
  useEffect(() => {
    if (addPost.data) router.push(`/control-panel/posts/update?id=${addPost.data[0].id}`);
  }, [addPost.data])


  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "New post title",
      description: "Post description",
      content: "Post content",
      category: "fe067eb1-9e96-407e-a5e7-84bf095067ef",
      author: "8845f57b-234e-43fd-a628-43b195d121a5",
      url: "test-url-for-post",
      status: "draft",
      featured_image: '1318e7b3-8bd0-4631-b82a-783ec34744f4'
    },
    mode: "onChange",
  });

  //Обробник кліку
  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    await addPost.useAction(data);
  };

  return { form, onSubmit, categories, authors, addPost };
};

export default useAddPostForm;
