import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { toast as Toast } from "sonner";


type useFetchStateProps = {
    action: any
    toast?: boolean
    successMessage?: string
    loadingMessage?: string
}

const useServerAction = <R, D> ({
    action,
    toast = false,
    successMessage = 'Success', 
    loadingMessage = 'Loading...'
}: useFetchStateProps) => {

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [actionResult, setResult] = useState< PostgrestSingleResponse<R> | null>(null)
    const [data, setData] = useState<R | null>(null)
    
    //Виконуємо екшн
    const useAction = async (data?: D) => {
        try {
            //Без
            if (!toast) {
                //обнуляємо повідомлення про помилку
                setErrorMessage(undefined);
                //Включаємо завантаження
                setIsLoading(true);
                //Виконуємо екшн
                const result: PostgrestSingleResponse<R> = await action({ ...data });
                //Записуємо відповідь сервера в змінну
                setResult(result);

                //Якщо помилка 
                if (result.error) {
                    //записуємо в змінну помилку
                    setErrorMessage(result.error.details);
                    //Виключаємо заванаження
                    setIsLoading(false)
                    return
                }

                //Данні з відповіді сервера записуємо в змінну
                setData(result.data)

                //Виключаємо заванаження
                setIsLoading(false)
                return
            }





            //обнуляємо повідомлення про помилку
            setErrorMessage(undefined);
            //Включаємо завантаження
            setIsLoading(true);
            //Показуємо повідомлення про завантаження
            const loadingToast = Toast.loading(loadingMessage);
            //Виконуємо екшн
            const result: PostgrestSingleResponse<R> = await action({...data});
            //Записуємо відповідь сервера в змінну
            setResult(result);

            //Якщо помилка 
            if (result.error) {
                //записуємо в змінну помилку
                setErrorMessage(result.error.details); 
                //Показуємо повідомлення помилки
                Toast.error(result.error.details);
                //Виключаємо заванаження
                setIsLoading(false)
                //ховаємо повідомлення про завантаження
                Toast.dismiss(loadingToast)
                return
            }

            //Якщо екшн повертає данні записуємо їх в змінну
            if (result.data) setData(result.data)

            //Показуємо повідомлення про успіх
            Toast.success(successMessage)
            //Виключаємо заванаження
            setIsLoading(false)
            //ховаємо повідомлення про завантаження
            Toast.dismiss(loadingToast)

        } catch (error: any) {
            console.log(error)
            //записуємо в змінну помилку
            setErrorMessage(error.message)
            //Показуємо повідомлення помилки
            Toast.error(error.message);
            //Виключаємо завантаження
            setIsLoading(false)
        }
    }

    return { useAction, actionResult, data, isLoading, errorMessage };

}

export default useServerAction;