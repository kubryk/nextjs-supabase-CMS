'use server'
import DashboardNav from "./dashboard/DashboardNav";
import HomeNav from "./home/HomeNav";

const Navigations = async () => {

    return (
        <header className="flex flex-col">
            <DashboardNav />
            <HomeNav />
        </header>
    )
}

export default Navigations;