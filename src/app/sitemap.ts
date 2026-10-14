import type { MetadataRoute } from "next";
import { href, siteUrl, type Route } from "@/i18n";

const ROUTES: Route[] = ["", "/sisoc", "/shineapp"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${siteUrl}${href("en", route)}`,
    alternates: { languages: { en: `${siteUrl}${href("en", route)}`, es: `${siteUrl}${href("es", route)}` } },
  }));
}
