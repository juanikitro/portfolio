import type { Metadata } from "next";
import { CaseHero, Decisions, H2, Learnings, NextCase, TextSections } from "@/components/CaseParts";
import { CompareTable } from "@/components/CompareTable";
import { Contact } from "@/components/Contact";
import { IncidentReport } from "@/components/IncidentReport";
import { MetroMap } from "@/components/MetroMap";
import { Pipeline } from "@/components/Pipeline";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { href } from "@/i18n";
import { pageMetadata, resolveLang } from "../page-utils";

// The accent marks verifiable facts: the weekly cadence and the scale.
const CADENCE = ["every week", "cada semana", "~750"];

export async function generateMetadata({ params }: PageProps<"/[lang]/sisoc">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata(lang, "/sisoc", t.meta.sisocTitle, t.meta.sisocDescription);
}

export default async function SisocCase({ params }: PageProps<"/[lang]/sisoc">) {
  const { lang, t } = await resolveLang(params);
  const s = t.sisoc;
  const ui = t.caseUi;

  return (
    <>
      <SiteHeader lang={lang} route="/sisoc" t={t} />
      <main id="main" className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)] gap-16 px-4 sm:px-8 md:gap-24">
        <CaseHero eyebrow={s.eyebrow} title={s.title} intro={s.intro} facts={s.facts} factsLabel={ui.facts} highlight={CADENCE} />

        <TextSections sections={s.sections} columns highlight={CADENCE} />

        <Reveal as="section">
          <span className="legend">{ui.solutionLabel}</span>
          <h2 className={H2}>{s.map.title}</h2>
          <MetroMap t={s.map} />
        </Reveal>

        <Decisions items={s.decisions} why={ui.decisionWhy} tradeoff={ui.decisionTradeoff} label={ui.decisionsLabel} title={s.decisionsTitle} highlight={["75%"]} />

        <section aria-labelledby="system-h" className="grid grid-cols-[minmax(0,1fr)] gap-10">
          <div>
            <span className="legend">{ui.resultLabel}</span>
            <h2 id="system-h" className={H2}>{s.systemTitle}</h2>
            <p className="m-0 max-w-[64ch] text-ink-2">{s.systemBody}</p>
          </div>
          <Reveal><CompareTable t={s.compare} /></Reveal>
          <Reveal><Pipeline t={s.pipeline} /></Reveal>
        </section>

        <Reveal><IncidentReport t={s.incident} label={ui.storyLabel} /></Reveal>

        <Learnings title={s.learnings.title} items={s.learnings.items} />

        <div>
          <NextCase to={href(lang, "/shineapp")} label={ui.next} name="ShineApp" back={ui.back} backTo={href(lang)} />
          <Contact t={t} lang={lang} />
        </div>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
