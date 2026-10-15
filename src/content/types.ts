export type Fact = { label: string; value: string };
export type Decision = { title: string; why: string; tradeoff: string; status?: string };
export type CaseSection = { id: string; label: string; title: string; body: string[] };

export type Dictionary = {
  meta: { title: string; description: string; sisocTitle: string; sisocDescription: string; shineTitle: string; shineDescription: string };
  nav: { experience: string; contact: string; theme: { toLight: string; toDark: string }; lang: string; langLabel: string; skip: string; home: string };
  hero: { lines: [string, string, string]; lede: string; sub: string; places: { sisoc: string; shine: string }; mapLabel: string };
  work: {
    label: string;
    title: string;
    readCase: string;
    sisoc: { chips: string[]; body: string; apps: [string, string, string] };
    shine: { chips: string[]; body: string; stops: [string, string, string, string] };
  };
  experience: { label: string; title: string; intro: string; sisocCta: string; stackLabel: string; items: { period: string; org: string; role: string; bullets: string[]; stack: string[] }[] };
  contact: { label: string; title: string; body: string; email: string; copied: string; cv: string };
  footer: { built: string };
  caseUi: { facts: string; back: string; next: string; decisionWhy: string; decisionTradeoff: string; decisionsLabel: string; solutionLabel: string; resultLabel: string; storyLabel: string };
  sisoc: {
    eyebrow: string;
    title: string;
    decisionsTitle: string;
    systemTitle: string;
    systemBody: string;
    intro: string;
    facts: Fact[];
    sections: CaseSection[];
    decisions: Decision[];
    map: { title: string; more: string; legend: { u: string; d: string; i: string; f: string } };
    compare: { before: string; now: string; rows: [string, string][] };
    pipeline: { title: string; release: string; checks: string; delivery: string; stages: { name: string; note: string; gate?: boolean }[]; deliveryStages: { name: string; note: string; gate?: boolean }[] };
    incident: { label: string; title: string; stamp: string; happened: [string, string]; did: [string, string]; changed: [string, string] };
    learnings: { title: string; items: string[] };
  };
  shine: {
    eyebrow: string;
    title: string;
    decisionsTitle: string;
    intro: string;
    facts: Fact[];
    sections: CaseSection[];
    decisions: Decision[];
    flow: { title: string; stops: { name: string; note: string }[] };
    features: { title: string; items: string[] };
    quote: { title: string; text: string; author: string; role: string; note: string };
    status: { title: string; body: string[] };
    learnings: { title: string; items: string[] };
  };
};
