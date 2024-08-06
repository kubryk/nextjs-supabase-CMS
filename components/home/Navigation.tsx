'use server'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container";
import { useEffect, useState } from "react";
import { fetchCategoriesAction } from "@/actions/Category-Actions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { PostCategoryType } from "@/types/global";
import { Router } from "next/router";

const Navigation = async () => {
    // const currentPathName = usePathname();
    // const [categories, setCategories] = useState<PostCategoryType[] | null>()

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const result: PostgrestSingleResponse<PostCategoryType[]> = await fetchCategoriesAction()
    //         setCategories(result.data)
    //     }
    //     fetchCategories()
    // }, [])

    const categories = await fetchCategoriesAction();

    return (
        <nav className="flex-1 w-full flex flex-col items-center pt-7 pb-7">
            <Container>
                <ul className="flex flex-row gap-8 justify-center items-center flex-wrap text-lg list-none p-0">
                    <Link href={'/'}>Home</Link>
                    {categories.data && categories.data.map((category) => {
                        return (
                            <li key={category.name}>
                                <Link
                                    // className={`/categories/${category.name}` === currentPathName ? ' bg-yellow-300' : undefined}
                                    href={`/categories/${category.url}`}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </Container>
            {/* <h2 className="font-bold text-5xl mb-4 mt-6">tattoospicker.com</h2> */}
        </nav>
    )
}

export default Navigation;