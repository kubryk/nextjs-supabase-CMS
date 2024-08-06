import { GeistSans } from "geist/font/sans";
import "../globals.css";
import CPNavigation from "@/components/control-panel/CP-Navigation";
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
                    <CPNavigation />
                    {children}
                </main>
                <Toaster richColors expand={true}/>
            </body>
        </html>
    );
}
