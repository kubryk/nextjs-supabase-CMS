import { postFormSchema } from "@/schemas/formSchemas";
import { MediaType } from "@/types/global";
import createMediaPath from "@/utils/mediaPath";
import { RefObject } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface UseEditorProps {
    form: UseFormReturn<any>
}

interface IPasteMediaProps {
    textAreaRef: RefObject<HTMLTextAreaElement>
    media: MediaType
    formFieldName: string
}

const useEditor = () => {
    const form = useFormContext()

    const pasteMedia = ({ media, textAreaRef, formFieldName }: IPasteMediaProps) => {

        if (textAreaRef.current && media && formFieldName) {
            //Місяць та рік завантаження медіа
            const date = createMediaPath(media);
            //Медіа в вигляді html
            const newHtmlMedia =
                `<div class="image_wrapper">
                <img class="image" src="/media/${date.year}/${date.month}/${media.name}" alt="${media.alt}"/>
                <div class="image_caption">${media.caption}</div>
                </div>`
            const htmlMedia = `<img style="width: 400px; margin: 0 auto;" src="/media/${date.year}/${date.month}/${media.name}" alt="${media.alt}"/>`;
            //Розділяємо посимвольно весь контент з поля форми
            const splittedFormValue = form.getValues()[formFieldName].split('');
            //Добавляємо медіа в масив символів контенту
            splittedFormValue.splice(textAreaRef.current.selectionStart, 0, newHtmlMedia);
            //Склеюємо массив символів в строку
            const modifiedFormValue: string = splittedFormValue.join('');
            //Вставляємо строку з добавленим медіа в форму
            form.setValue(formFieldName, modifiedFormValue);
        }
        return
    }

    return { pasteMedia }
}

export default useEditor;