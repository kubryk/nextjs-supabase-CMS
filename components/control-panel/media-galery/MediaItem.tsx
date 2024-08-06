import { MediaType } from "@/types/global";
import createMediaPath from "@/utils/mediaPath";
import Image from "next/image";

const MediaItem = ({ media }: { media: MediaType }) => {
    const { mediaPath } = createMediaPath(media);

    return (
        <Image
            fill={true}
            sizes="180"
            quality={1}
            key={media.id}
            alt={media.alt}
            src={`/media/${mediaPath}`}
        />
    );
}

export default MediaItem;