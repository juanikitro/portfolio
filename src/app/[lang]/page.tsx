import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ProjectCards } from "@/components/ProjectCards";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { href } from "@/i18n";
import { pageMetadata, resolveLang } from "./page-utils";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata(lang, "", t.meta.title, t.meta.description);
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <SiteHeader lang={lang} route="" t={t} />
      <main id="main">
        <Hero lang={lang} t={t} />
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <ProjectCards lang={lang} t={t} />
          <Experience t={t.experience} sisocHref={href(lang, "/sisoc")} />
          <Contact t={t} lang={lang} />
        </div>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
