'use client'
import { useEffect } from "react";
import MediaForm from "./media-form/MediaForm";
import MediaList from "./media-list/MediaList";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchAllMedia } from "@/features/media/MediaGalerySlice";

const StaticMediaGalery = () => {
    const dispatch = useAppDispatch();
    const { media, selectedMedia } = useAppSelector(state => state.mediaGalery);

    useEffect(() => {
        dispatch(fetchAllMedia());
    }, [])

    return (
        <div>
            {media &&
                <div className="flex ">
                    <MediaList type='allMedia' />
                    {selectedMedia && <MediaForm />}
                </div>}

        </div>
    );
}

export default StaticMediaGalery;