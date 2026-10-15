import Link from "next/link";
import type { Dictionary } from "@/content";
import { href, type Locale } from "@/i18n";
import { FlowCanvas } from "./FlowCanvas";
import { RichText } from "./RichText";

// The hero fills the viewport minus the header, leaving a header-sized gap at the bottom
// so the next section is hinted at the edge of the first screen.
export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [a, b, c] = t.hero.lines;
  return (
    <div className="relative flex min-h-[calc(100svh-2*var(--header-h))] items-center overflow-hidden border-b border-rule">
      <FlowCanvas />
      <div className="relative mx-auto grid w-full max-w-[1360px] items-end gap-x-12 gap-y-8 px-4 py-14 sm:px-8 lg:grid-cols-[7fr_5fr]">
        <div className="min-w-0 lg:col-span-2">
          <h1 className="m-0 font-display text-[clamp(2.1rem,5.6vw,4.9rem)] font-black leading-[1.0] tracking-[-0.03em] [overflow-wrap:anywhere]">
            <span className="rise"><span>{a}</span></span>
            <span className="rise"><span>{b}</span></span>
            <span className="rise text-route"><span>{c}</span></span>
          </h1>
        </div>
        <div className="min-w-0">
          <p className="m-0 max-w-[54ch] whitespace-pre-line font-display text-lg font-semibold text-ink">{t.hero.lede}</p>
          <p className="m-0 mt-2 max-w-[54ch] text-ink-2"><RichText text={t.hero.sub} highlight={["~750"]} /></p>
          {/* the recruiter scan line: seniority, languages, location */}
          <p className="m-0 mt-4 inline-block rounded-[10px] border border-rule bg-surface px-3.5 py-1.5 font-mono text-[13px] text-ink sm:rounded-full">
            {t.hero.facts.join(" - ")}
          </p>
        </div>
        <nav aria-label={t.hero.mapLabel} className="grid gap-2.5">
          {[
            { name: "SISOC", desc: t.hero.places.sisoc, to: href(lang, "/sisoc"), pin: "border-route" },
            { name: "ShineApp", desc: t.hero.places.shine, to: href(lang, "/shineapp"), pin: "border-line-f" },
          ].map((p) => (
            <Link key={p.name} href={p.to} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-[10px] border border-rule bg-surface px-3.5 py-3 font-display no-underline transition duration-200 hover:translate-x-1 hover:border-route">
              <span className={`size-3.5 rounded-full border-[3px] bg-surface ${p.pin}`} aria-hidden="true" />
              <span>
                <b className="block text-base font-extrabold">{p.name}</b>
                <span className="text-[13px] text-muted">{p.desc}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
