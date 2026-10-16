import { getDictionary, type Dictionary } from "@/content";
import type { CaseSection, Decision, Fact } from "@/content/types";
import { cvPath, href, locales, siteUrl, type Locale } from "@/i18n";

const link = (label: string, path: string) => `[${label}](${new URL(path, `${siteUrl}/`).href})`;
const bullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
const section = (level: number, title: string, ...body: string[]) =>
  `${"#".repeat(level)} ${title}\n\n${body.filter(Boolean).join("\n\n")}`;

function facts(items: Fact[]) {
  return bullets(items.map((fact) => `${fact.label}: ${fact.href ? link(fact.value, fact.href) : fact.value}`));
}

function textSections(items: CaseSection[]) {
  return items.map((item) => section(4, `${item.label}: ${item.title}`, ...item.body)).join("\n\n");
}

function decisions(t: Dictionary, title: string, items: Decision[]) {
  return section(4, title, ...items.map((item) => section(5, item.title,
    item.status ?? "",
    `${t.caseUi.decisionWhy}: ${item.why}`,
    `${t.caseUi.decisionTradeoff}: ${item.tradeoff}`,
  )));
}

/** A small entry point; the detailed copy stays in the generated full-text resource. */
export function llmsIndex() {
  return [
    "# Juan Ignacio Portilla Kitroser",
    `> ${getDictionary("en").meta.description}`,
    "Personal portfolio in English and Spanish. The complete text is generated from the same content as the website and includes work experience, contact details, and both project case studies with decisions, trade-offs and diagram descriptions.",
    section(2, "Complete text", `- ${link("Full portfolio — English and Español", "/llms-full.txt")}`),
    ...locales.map((lang) => section(2, lang === "en" ? "English pages" : "Páginas en español", bullets([
      link(lang === "en" ? "Profile, experience and contact" : "Perfil, experiencia y contacto", href(lang)),
      link("SISOC", href(lang, "/sisoc")),
      link("ShineApp", href(lang, "/shineapp")),
      link("CV (PDF)", cvPath(lang)),
    ]))),
  ].join("\n\n") + "\n";
}

function localePortfolio(lang: Locale) {
  const t = getDictionary(lang);
  const s = t.sisoc;
  const shine = t.shine;

  return [
    section(2, lang === "en" ? "English" : "Español"),
    section(3, t.meta.title,
      link(t.nav.home, href(lang)),
      t.hero.lines.join(" "), t.hero.lede, t.hero.sub, bullets(t.hero.facts),
    ),
    section(4, t.work.title,
      section(5, "SISOC", link(t.work.readCase, href(lang, "/sisoc")),
        bullets(t.work.sisoc.chips), t.work.sisoc.body, bullets(t.work.sisoc.apps)),
      section(5, "ShineApp", link(t.work.readCase, href(lang, "/shineapp")),
        bullets(t.work.shine.chips), t.work.shine.body, t.work.shine.stops.join(" → ")),
    ),
    section(4, t.experience.title, t.experience.intro,
      ...t.experience.items.map((item) => section(5, `${item.org} (${item.period})`,
        item.role, bullets(item.bullets), `${t.experience.stackLabel}: ${item.stack.join(", ")}`)),
    ),
    section(4, t.contact.title, t.contact.body,
      section(5, t.contact.termsLabel, bullets(t.contact.terms)),
      bullets([
        `[${t.contact.email}](mailto:${t.contact.email})`,
        link(t.contact.cv, cvPath(lang)),
        link("GitHub", "https://github.com/juanikitro"),
        link("LinkedIn", "https://www.linkedin.com/in/juanikitro/"),
      ]),
    ),
    section(3, s.eyebrow, link(s.title, href(lang, "/sisoc")), s.intro, facts(s.facts)),
    textSections(s.sections),
    section(4, s.map.title, s.map.description, bullets(Object.values(s.map.legend))),
    decisions(t, s.decisionsTitle, s.decisions),
    section(4, s.systemTitle, s.systemBody,
      ...s.compare.rows.map(([before, now]) => `${s.compare.before}: ${before}\n\n${s.compare.now}: ${now}`),
    ),
    section(4, s.pipeline.title, s.pipeline.release,
      section(5, s.pipeline.checks, bullets(s.pipeline.stages.map((stage) => `${stage.name}: ${stage.note}`))),
      section(5, s.pipeline.delivery, s.pipeline.deliveryStages.map((stage, i) => `${i + 1}. ${stage.name}: ${stage.note}`).join("\n")),
    ),
    section(4, s.incident.title, s.incident.label, s.incident.stamp,
      ...[s.incident.happened, s.incident.did, s.incident.changed].map(([label, body]) => section(5, label, body)),
    ),
    section(4, s.learnings.title, bullets(s.learnings.items)),
    section(3, shine.eyebrow, link(shine.title, href(lang, "/shineapp")), shine.intro, facts(shine.facts)),
    textSections(shine.sections),
    section(4, shine.flow.title, shine.flow.stops.map((stop, i) => `${i + 1}. ${stop.name}: ${stop.note}`).join("\n")),
    decisions(t, shine.decisionsTitle, shine.decisions),
    section(4, shine.features.title, bullets(shine.features.items)),
    section(4, shine.status.title, ...shine.status.body),
    section(4, shine.quote.title, `> ${shine.quote.text}`,
      `${shine.quote.author} — ${shine.quote.role}`, shine.quote.note),
    section(4, shine.learnings.title, bullets(shine.learnings.items)),
  ].join("\n\n");
}

/** Render the published dictionaries; no private documents or runtime requests. */
export function llmsFull() {
  return ["# Juan Ignacio Portilla Kitroser — Portfolio", ...locales.map(localePortfolio)].join("\n\n") + "\n";
}
