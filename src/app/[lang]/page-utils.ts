import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { hasLocale, href, type Locale, type Route } from "@/i18n";

export async function resolveLang(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: getDictionary(lang) };
}

/** Canonical + hreflang alternates for a route. */
export function pageMetadata(lang: Locale, route: Route, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: href(lang, route),
      languages: { en: href("en", route), es: href("es", route), "x-default": href("en", route) },
    },
    openGraph: { title, description, url: href(lang, route), images: [{ url: "/juan.jpg", width: 460, height: 460, alt: "Juan Ignacio Portilla Kitroser" }] },
    twitter: { card: "summary", title, description },
  };
}
