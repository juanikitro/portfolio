import { ogAlt, ogImage, ogSize } from "@/components/OgCard";
import { locales } from "@/i18n";
import { resolveLang } from "./page-utils";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

// one image per language, rendered at build time
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { t } = await resolveLang(params);
  return ogImage({ role: t.og.role, kicker: t.og.open, lines: t.hero.lines, accentLast: true, chips: t.hero.facts });
}
