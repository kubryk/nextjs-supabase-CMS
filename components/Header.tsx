'use server'
import HomeNav from "./home/HomeNav";

const Navigations = async () => {

    return (
        <header className="flex flex-col">
            <HomeNav />
        </header>
    )
}

export default Navigations;