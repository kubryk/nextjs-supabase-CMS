import { GeistSans } from "geist/font/sans";
import "../globals.css";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { Toaster } from "sonner";

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
            <body>
                <main className="min-h-screen flex flex-col items-center ">
                    <DashboardNav />
                    {children}
                </main>
                <Toaster richColors expand={true} />
            </body>
        </html>
    );
}
