import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Overpass, Overpass_Mono, Source_Serif_4 } from "next/font/google";
import { Providers } from "@/components/Providers";
import { getDictionary } from "@/content";
import { hasLocale, locales, siteUrl } from "@/i18n";
import "../globals.css";

const overpass = Overpass({ subsets: ["latin"], weight: ["400", "600", "800", "900"], variable: "--font-overpass" });
const overpassMono = Overpass_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-overpass-mono" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-source-serif" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: "Juan Ignacio Portilla Kitroser" }],
    openGraph: { type: "website", siteName: "Juan Ignacio Portilla Kitroser", locale: lang === "en" ? "en_US" : "es_AR" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#13211f" },
  ],
};

// Applies a stored theme choice before first paint, so a returning visitor never sees the wrong theme flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    // data-scroll-behavior lets Next turn smooth scrolling off while it scrolls to the top on navigation (Next 16)
    <html lang={lang} data-scroll-behavior="smooth" className={`${overpass.variable} ${overpassMono.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS, content that would animate in must stay visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
