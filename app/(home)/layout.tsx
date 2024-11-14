import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tattoos Picker - Best Tattoos for Women and Men in 2024",
  description: "Get new tattoo ideas, discover the best tattoos and styles for your body.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className}>
      {/* <html lang="en" className={openSans.className}>*/}
      <body>
        <Header />
        <main className="min-h-screen flex flex-col items-center ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
