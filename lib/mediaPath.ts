import { MediaType } from "@/types/global";

const createMediaPath = (media: MediaType) => {
        // if (media) {
        const date = new Date(media.created_at)
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1;
        const mediaPath: string = `${year}/${month}/${media.name}`
        return { year, month, mediaPath }
        // }
}

export default createMediaPath;