'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MediaListItem from "./MediaListItem";
import { setSelectedMedia } from "@/features/media/MediaGalerySlice";
import { cn } from "@/lib/utils";


interface MediaListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: string;
}

const MediaList = ({ type, ...rest }: MediaListProps) => {
    const { selectedMedia, media, postMedia } = useAppSelector(state => state.mediaGalery);
    const dispatch = useAppDispatch();

    if (type === 'postMedia') {
        return (
            <div className={cn(`flex flex-wrap overflow-auto w-auto`, rest.className)} >
                <div className=" border-[1px] border-gray-200 bg-slate-400">
                    {postMedia && postMedia.map((media) => {
                        return (
                            <div
                                key={media.id}
                                onClick={() => dispatch(setSelectedMedia(media))}
                                className={cn("relative cursor-pointer w-[180px] h-[180px]", selectedMedia && selectedMedia.id === media.id ? "opacity-40" : '')}
                            >
                                <MediaListItem media={media} />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className={cn(`flex flex-col`, rest.className)}>

            <div className=" p-3 gap-1 flex items-center flex-wrap overflow-auto rounded-lg">

                {media && media.map((media) => {
                    return (
                        <div
                            key={media.id}
                            onClick={() => dispatch(setSelectedMedia(media))}
                            className={cn("relative cursor-pointer w-[100px] h-[100px]", selectedMedia && selectedMedia.id === media.id ? "opacity-40" : '')}
                        >
                            <MediaListItem media={media} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MediaList;