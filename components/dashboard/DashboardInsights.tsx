'use client'
import { fetchAuthors } from "@/features/authors/fetchAuthorsSlice";
import { fetchPosts } from "@/features/post/fetchPostsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";

const Insights = () => {

    const dispatch = useAppDispatch();
    const { authors, loading } = useAppSelector(state => state.fetchAuthors);
    const { posts, isLoading } = useAppSelector(state => state.fetchPosts);

    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchPosts());
    }, [dispatch]);


    return (
        <div>
            <h1>Insights</h1>
            Authors
            <div>{authors?.length}</div>
            Posts
            <div>{posts?.length}</div>
        </div>
    );
}

export default Insights;