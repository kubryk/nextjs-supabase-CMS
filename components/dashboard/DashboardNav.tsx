import Link from "next/link";
import AuthButton from "../auth/AuthButton";
import { ControlPanelLinks } from "@/lib/links";
import { createClient } from "@/lib/supabase/server";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const DashboardNav = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            {user &&
                <div className="w-full bg-indigo-200 flex items-center justify-between py-4 px-4 gap-5">
                    <NavigationMenu className=" gap-3">
                        <NavigationMenuList className=" p-0 m-0">
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Website
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Dashboard
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/dashboard/media" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Media
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>


                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link href={ControlPanelLinks.posts}>Posts</Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <Link href={ControlPanelLinks.createPost}>+ Add post</Link>
                                    </NavigationMenuLink >
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link href={ControlPanelLinks.categories}>Categories</Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <Link href={ControlPanelLinks.createCategory}>+ Add category</Link>
                                    </NavigationMenuLink >
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link href={ControlPanelLinks.authors}>Authors</Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <Link href={ControlPanelLinks.createAuthor}>+ Add author</Link>
                                    </NavigationMenuLink >
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <AuthButton />
                </div>
            }
        </>
    );
}

export default DashboardNav;