import { GeistSans } from "geist/font/sans";
import "../globals.css";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StoreProvider from "@/providers/StoreProvider";


const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "TattoosPicker",
    description: "Tattoo photos, meanings and more",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className={GeistSans.className}>
            <StoreProvider>
                <body>
                    <main className="min-h-screen flex ">
                        <DashboardSidebar />

                        <div className="flex flex-col w-full">
                            <DashboardHeader />

                            {/* <div className=" w-auto h-full overflow-auto "> */}
                            {children}
                            {/* </div> */}
                        </div>



                    </main>
                    <Toaster richColors expand={true} />
                </body>
            </StoreProvider>
        </html>
    );
}
