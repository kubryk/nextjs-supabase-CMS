import { GeistSans } from "geist/font/sans";
import "../globals.css";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StoreProvider from "@/providers/StoreProvider";
import { createClient } from "@/lib/supabase/server";


const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "TattoosPicker",
    description: "Tattoo photos, meanings and more",
};


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <html lang="en" className={GeistSans.className}>
            <StoreProvider>
                <body>
                    <main className="min-h-screen flex ">
                        {user && <DashboardSidebar />}

                        <div className="flex flex-col w-full items-center">
                            {user && <DashboardHeader />}
                            {children}
                        </div>
                    </main>
                    <Toaster richColors expand={true} />
                </body>
            </StoreProvider>
        </html>
    );
}
