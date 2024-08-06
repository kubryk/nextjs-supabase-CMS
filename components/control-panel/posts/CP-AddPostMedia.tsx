'use client'
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CPMediaList from "../media/CP-MediaList";

const CPAddPostMedia = () => {
    return (
        <Provider store={store}>
            <CPMediaList />
        </Provider>

    );
}

export default CPAddPostMedia;