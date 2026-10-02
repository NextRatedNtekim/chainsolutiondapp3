import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: `${site.name} · Student Support`,
  description: site.description,
  openGraph: { title: `${site.name} · Student Support`, description: site.description, type: "website" },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0d" },
  ],
};
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
