'use client'
import Link from "next/link";
import { ControlPanelLinks } from "@/lib/links";
import { usePathname } from "next/navigation";

import { RxDashboard } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { BsPostcard } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";



import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";


const DashboardNav = () => {


    const pathname = usePathname();


    return (
        <div className=" w-[200px] bg-indigo-100 pb-4 flex flex-col items-center">

            <div className="flex items-center justify-center h-[50px] border-b-[1px] border-gray-300 w-full  ">
                <Link href='/'>
                    <h1 className=" font-extrabold hover:text-indigo-700 duration-500">TattoosPicker</h1>
                </Link>
            </div>

            <div className="flex flex-col justify-between h-full w-full">
                <ul className=" list-none flex justify-center flex-col p-0 w-full">
                    <li className={cn("py-2 hover:bg-indigo-700 hover:text-indigo-100 duration-500 px-4", pathname === '/dashboard' ? 'bg-indigo-500 text-indigo-100' : '')}>
                        <Link href="/dashboard" className="flex gap-2 items-center">
                            <RxDashboard size={25} />
                            <span className=" text-sm">Dashboard</span>
                        </Link>
                    </li>
                    <li className={cn("py-2 hover:bg-indigo-700 hover:text-indigo-100 duration-500 px-4", pathname === '/dashboard/media' ? 'bg-indigo-500 text-indigo-100' : '')}>
                        <Link href="/dashboard/media" className="flex gap-2 items-center">
                            <IoImagesOutline size={25} />
                            <span className=" text-sm">Medias</span>
                        </Link>
                    </li>


                    <li>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={cn(" hover:bg-indigo-700 hover:text-indigo-100 duration-500 flex justify-start gap-2 py-2 px-4", pathname === '/dashboard/posts' || pathname === '/dashboard/posts/create' ? 'bg-indigo-500 text-indigo-100' : '')}>
                                    <BsPostcard size={25} />
                                    <span>Posts</span>
                                </AccordionTrigger>
                                <AccordionContent className="py-2 px-4 hover:bg-indigo-200">
                                    <Link href={ControlPanelLinks.posts} className="flex gap-2 items-center">
                                        <span className={cn(pathname === '/dashboard/posts' ? 'font-bold text-black' : '')}>All Posts</span>
                                    </Link>
                                </AccordionContent>
                                <AccordionContent className="py-2 px-4 hover:bg-indigo-200">
                                    <Link href={ControlPanelLinks.createPost} className="flex gap-2 items-center">
                                        <span className={cn(pathname === '/dashboard/posts/create' ? 'font-bold text-black' : '')}> Add New</span>
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    <li className={cn("py-2 hover:bg-indigo-700 hover:text-indigo-100 duration-500 px-4", pathname === '/dashboard/categories' ? 'bg-indigo-500 text-indigo-100' : '')}>
                        <Link href="/dashboard/categories" className="flex gap-2 items-center">
                            <TbCategory size={25} />
                            <span className=" text-sm">Categories</span>
                        </Link>
                    </li>

                    <li className={cn("py-2 hover:bg-indigo-700 hover:text-indigo-100 duration-500 px-4", pathname === '/dashboard/authors' ? 'bg-indigo-500 text-indigo-100' : '')}>
                        <Link href="/dashboard/authors" className="flex gap-2 items-center">
                            <GoPerson size={25} />
                            <span className=" text-sm">Authors</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default DashboardNav;