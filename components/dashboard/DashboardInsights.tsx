'use client'
import { fetchAuthors } from "@/features/authors/fetchAuthorsSlice";
import { fetchPosts } from "@/features/post/fetchPostsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const Insights = () => {

    const dispatch = useAppDispatch();
    const { authors, loading } = useAppSelector(state => state.fetchAuthors);
    const { posts, isLoading } = useAppSelector(state => state.fetchPosts);

    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchPosts());
    }, [dispatch]);


    return (
        <div className="p-4 flex justify-between">
            <Card className=" min-w-[400px]">
                <CardHeader>
                    <CardTitle>
                        Posts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>Total: {posts?.length}</div>
                </CardContent>
            </Card>
            <Card className=" min-w-[400px]">
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>Total: </div>
                </CardContent>
            </Card>
            <Card className=" min-w-[400px]">
                <CardHeader>
                    <CardTitle>Authors</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>Total: {authors?.length}</div>
                </CardContent>
            </Card>

        </div>
    );
}

export default Insights;