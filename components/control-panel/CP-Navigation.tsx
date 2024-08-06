import Link from "next/link";
import AuthButton from "../auth/AuthButton";
import { ControlPanelLinks } from '@/lib/links'


const CPNavigation = () => {
    return (
        <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <div className="flex gap-5">
                    <Link href={'/'}>Website</Link>
                    <Link href={ControlPanelLinks.home}>Control Panel</Link>
                    <Link href={ControlPanelLinks.posts}>Posts</Link>
                    <Link href={ControlPanelLinks.createPost}>Add post</Link>
                    <Link href={ControlPanelLinks.categories}>Categories</Link>
                    <Link href={ControlPanelLinks.createCategory}>Add category</Link>
                    <Link href={ControlPanelLinks.media}>Media</Link>
                </div>
                <AuthButton />
            </div>
        </div>
    );
}

export default CPNavigation;