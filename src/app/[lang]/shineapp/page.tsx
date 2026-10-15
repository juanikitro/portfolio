import type { Metadata } from "next";
import Image from "next/image";
import logo from "../../../../public/the-king-shine.png";
import { CaseHero, Decisions, H2, Learnings, NextCase, TextSections } from "@/components/CaseParts";
import { Contact } from "@/components/Contact";
import { FlowLine } from "@/components/FlowLine";
import { Reveal } from "@/components/Reveal";
import { KING_SHINE_URL, RichText } from "@/components/RichText";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { href } from "@/i18n";
import { pageMetadata, resolveLang } from "../page-utils";

export async function generateMetadata({ params }: PageProps<"/[lang]/shineapp">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata(lang, "/shineapp", t.meta.shineTitle, t.meta.shineDescription);
}

export default async function ShineCase({ params }: PageProps<"/[lang]/shineapp">) {
  const { lang, t } = await resolveLang(params);
  const s = t.shine;
  const ui = t.caseUi;

  return (
    <>
      <SiteHeader lang={lang} route="/shineapp" t={t} />
      <main id="main" className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)] gap-16 px-4 sm:px-8 md:gap-24">
        <CaseHero eyebrow={s.eyebrow} title={s.title} intro={s.intro} facts={s.facts} factsLabel={ui.facts} lang={lang} />

        <div className="grid gap-12">
          <TextSections sections={s.sections} />
        </div>

        <Reveal as="section">
          <span className="legend">{ui.solutionLabel}</span>
          <h2 className={H2}>{s.flow.title}</h2>
          <FlowLine t={s.flow} />
        </Reveal>

        <Decisions items={s.decisions} why={ui.decisionWhy} tradeoff={ui.decisionTradeoff} label={ui.decisionsLabel} title={s.decisionsTitle} />

        <section aria-labelledby="result-h" className="grid gap-x-14 gap-y-8 md:grid-cols-2">
          <Reveal>
            <span className="legend">{ui.resultLabel}</span>
            <h2 id="result-h" className={H2}>{s.features.title}</h2>
            <ul className="m-0 grid list-none gap-2 p-0">
              {s.features.items.map((f) => (
                <li key={f} className="flex gap-3 text-[15.5px]">
                  <span aria-hidden="true" className="mt-2 size-2.5 flex-none rounded-full border-2 border-line-f" />
                  <span><RichText text={f} /></span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="grid content-start gap-6">
            <div>
              <h2 className="mb-3 mt-6 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold md:mt-7">{s.status.title}</h2>
              {s.status.body.map((p) => <p key={p} className="m-0 text-ink-2"><RichText text={p} /></p>)}
            </div>
          </Reveal>
        </section>

        <Reveal as="section">
          <figure className="m-0 grid overflow-hidden rounded-[18px] border-2 border-ink bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
            {/* the logo has white lettering, so it always sits on a dark plate */}
            <a href={KING_SHINE_URL} target="_blank" rel="noopener noreferrer" aria-label="The King Shine on Instagram" className="grid place-items-center bg-logo-plate p-8 transition-opacity hover:opacity-90">
              <Image src={logo} alt="The King Shine - Estética vehicular" className="h-auto w-full max-w-[360px]" />
            </a>
            <div className="grid content-center gap-5 p-6 sm:p-10">
              <span className="legend"><RichText text={s.quote.title} /></span>
              <blockquote className="m-0 font-display text-[clamp(1.15rem,1.9vw,1.45rem)] font-semibold leading-snug">
                <span aria-hidden="true" className="mr-1 text-route">“</span>
                {s.quote.text}
                <span aria-hidden="true" className="ml-0.5 text-route">”</span>
              </blockquote>
              <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <b className="font-display text-base font-extrabold">{s.quote.author}</b>
                <span className="text-[15px] text-ink-2"><RichText text={s.quote.role} /></span>
                {s.quote.note && <span className="font-mono text-xs text-muted">{s.quote.note}</span>}
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <Learnings title={s.learnings.title} items={s.learnings.items} />

        <div>
          <NextCase to={href(lang, "/sisoc")} label={ui.next} name="SISOC" back={ui.back} backTo={href(lang)} />
          <Contact t={t} lang={lang} />
        </div>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
