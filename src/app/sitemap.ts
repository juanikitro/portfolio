import type { MetadataRoute } from "next";
import { href, locales, siteUrl, type Route } from "@/i18n";

const ROUTES: Route[] = ["", "/sisoc", "/shineapp"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) => ROUTES.map((route) => ({
    url: `${siteUrl}${href(lang, route)}`,
    alternates: { languages: { en: `${siteUrl}${href("en", route)}`, es: `${siteUrl}${href("es", route)}` } },
  })));
}
