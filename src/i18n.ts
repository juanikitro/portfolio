export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type Route = "" | "/sisoc" | "/shineapp";

/** Public URL for a route in a locale. English has no prefix. */
export const href = (lang: Locale, route: Route = "", hash = "") =>
  `${lang === "en" ? route || "/" : `/es${route}`}${hash}`;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** The CV in the page's language. */
export const cvPath = (lang: Locale) => `/cv/Juan_Ignacio_Portilla_Kitroser_CV_${lang === "en" ? "EN" : "ES"}.pdf`;
