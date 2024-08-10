'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MediaListItem from "./MediaListItem";
import { setSelectedMedia } from "@/features/media/MediaGalerySlice";


const MediaList = ({ className, type }: { className?: string, type: string }) => {
    const { selectedMedia, media, postMedia } = useAppSelector(state => state.mediaGalery);
    const dispatch = useAppDispatch();

    if (type === 'postMedia') {
        return (
            <div className={`flex flex-1 gap-1 flex-wrap overflow-auto h-[650px] ${className}`} >
                {postMedia && postMedia.map((media) => {
                    return (
                        <div
                            key={media.id}
                            onClick={() => dispatch(setSelectedMedia(media))}
                            className={"relative cursor-pointer bg-slate-400 w-[180px] h-[180px] " + (selectedMedia && selectedMedia.id === media.id ? "opacity-40" : '')}
                        >
                            <MediaListItem media={media} />
                        </div>
                    )
                })}
            </div>
        );
    }

    return (
        <div className={`flex flex-1 gap-1 flex-wrap overflow-auto h-[650px] ${className}`} >
            {media && media.map((media) => {
                return (
                    <div
                        key={media.id}
                        onClick={() => dispatch(setSelectedMedia(media))}
                        className={"relative cursor-pointer bg-slate-400 w-[180px] h-[180px] " + (selectedMedia && selectedMedia.id === media.id ? "opacity-40" : '')}
                    >
                        <MediaListItem media={media} />
                    </div>
                )
            })}
        </div>
    );
}

export default MediaList;