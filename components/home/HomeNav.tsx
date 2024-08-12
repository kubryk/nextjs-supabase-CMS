import { fetchCategoriesAction } from "@/actions/Category-Actions";
import { createClient } from "@/lib/supabase/server";
import Container from "../Container";
import Link from "next/link";

const HomeNav = async () => {
    const categories = await fetchCategoriesAction();
    return (
        <nav className=" py-4 flex items-center justify-between px-[200px] border-b-[1px]">
            <Link href={'/'}>
                <h1 className=" text-lg">TattoosPicker</h1>
            </Link>
            <ul className="flex flex-row gap-8 justify-center items-center list-none px-0 m-0">
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

        </nav>
    );
}

export default HomeNav;