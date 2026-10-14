import Link from "next/link";
import type { CaseSection, Decision, Fact } from "@/content/types";
import { Reveal } from "./Reveal";
import { RichText } from "./RichText";

export const H2 = "mb-6 mt-2 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]";

export function CaseHero({ eyebrow, title, intro, facts, factsLabel, highlight }: { eyebrow: string; title: string; intro: string; facts: Fact[]; factsLabel: string; highlight?: string[] }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 pb-4 pt-14 md:pt-24 lg:grid-cols-[7fr_5fr] lg:items-end">
      <div className="min-w-0">
        <span className="legend">{eyebrow}</span>
        <h1 className="mb-5 mt-3 font-display text-[clamp(2.25rem,5.4vw,4.25rem)] font-black leading-[1.0] tracking-[-0.03em] [overflow-wrap:anywhere]">{title}</h1>
        <p className="m-0 max-w-[58ch] text-lg text-ink-2"><RichText text={intro} highlight={highlight} /></p>
      </div>
      <dl aria-label={factsLabel} className="m-0 grid gap-0 rounded-[14px] border border-rule bg-surface px-5 py-2">
        {facts.map((f) => (
          <div key={f.label} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-rule py-2.5 last:border-0">
            <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{f.label}</dt>
            <dd className="m-0 font-display text-[15px]"><RichText text={f.value} highlight={highlight} /></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function TextSections({ sections, columns = false, highlight }: { sections: CaseSection[]; columns?: boolean; highlight?: string[] }) {
  if (columns) {
    // side by side: each section is a column with a route-colored rule on top
    return (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
        {sections.map((s, i) => (
          <Reveal as="section" key={s.id} delay={i * 0.08} className="grid content-start gap-4 border-t-4 border-route pt-6">
            <div>
              <span className="legend">{s.label}</span>
              <h2 className="mb-0 mt-2 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-extrabold leading-[1.12] tracking-[-0.015em]">{s.title}</h2>
            </div>
            {s.body.map((p) => (
              <p key={p.slice(0, 32)} className="m-0 text-[16.5px]"><RichText text={p} highlight={highlight} /></p>
            ))}
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <>
      {sections.map((s) => (
        <Reveal as="section" key={s.id} className="grid grid-cols-[minmax(0,1fr)] gap-x-14 border-t border-rule pt-10 md:grid-cols-[4fr_8fr]">
          <div>
            <span className="legend">{s.label}</span>
            <h2 className="mb-4 mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.015em]">{s.title}</h2>
          </div>
          <div className="grid gap-4">
            {s.body.map((p) => (
              <p key={p.slice(0, 32)} className="m-0 max-w-[64ch]"><RichText text={p} highlight={highlight} /></p>
            ))}
          </div>
        </Reveal>
      ))}
    </>
  );
}

export function Decisions({ items, why, tradeoff, label, title, highlight }: { items: Decision[]; why: string; tradeoff: string; label: string; title: string; highlight?: string[] }) {
  return (
    <section aria-labelledby="decisions-h">
      <span className="legend">{label}</span>
      <h2 id="decisions-h" className={H2}>{title}</h2>
      <ol className="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-4 p-0 md:grid-cols-2">
        {items.map((d, i) => (
          <Reveal as="li" key={d.title} delay={(i % 2) * 0.06} className="grid content-start gap-3 rounded-[14px] border border-rule bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="m-0 font-display text-lg font-extrabold leading-snug">{d.title}</h3>
              {d.status && <span className="whitespace-nowrap rounded-full border border-dev px-2.5 py-0.5 font-mono text-[11px]">{d.status}</span>}
            </div>
            <p className="m-0 text-[15.5px]"><b className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{why} - </b><RichText text={d.why} highlight={highlight} /></p>
            <p className="m-0 text-[15.5px] text-ink-2"><b className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{tradeoff} - </b><RichText text={d.tradeoff} highlight={highlight} /></p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Learnings({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal as="section" className="border-t-2 border-ink pt-8">
      <h2 className={H2}>{title}</h2>
      <ul className="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-3 p-0 md:grid-cols-2">
        {items.map((it) => (
          <li key={it} className="border-l-4 border-route pl-4 font-display text-lg leading-snug">{it}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export function NextCase({ to, label, name, back, backTo }: { to: string; label: string; name: string; back: string; backTo: string }) {
  return (
    <nav aria-label={label} className="flex flex-col-reverse items-start gap-6 border-t border-rule py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
      <Link href={backTo} className="inline-flex min-h-10 items-center font-mono text-sm no-underline hover:text-route">← {back}</Link>
      <Link href={to} className="group text-left no-underline sm:text-right">
        <span className="legend block">{label}</span>
        <span className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-[-0.03em] transition-colors group-hover:text-route">{name} →</span>
      </Link>
    </nav>
  );
}
