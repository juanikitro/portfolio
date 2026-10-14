"use client";

import * as m from "motion/react-m";
import type { Dictionary } from "@/content";

// Icons are drawn on a 20×20 box with the mark at the exact center, so they sit centered in their circle.
const Cross = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" className="flex-none">
    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" className="flex-none">
    <circle cx="10" cy="10" r="10" fill="var(--route)" />
    <path d="M5.8 10.4l2.8 2.8 5.6-6" fill="none" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Before → now. Two columns from sm up; on phones each row becomes its own small block,
// labelled "when I joined" / "now" and joined by an arrow, so the pairing is never ambiguous.
export function CompareTable({ t }: { t: Dictionary["sisoc"]["compare"] }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:gap-0 sm:border-t-2 sm:border-ink sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]" role="table" aria-label={`${t.before} / ${t.now}`}>
      <div role="row" className="hidden sm:contents">
        <span role="columnheader" className="legend border-b border-rule pb-2.5 pt-3">{t.before}</span>
        <span role="columnheader" className="legend border-b border-rule pb-2.5 pt-3">{t.now}</span>
      </div>
      {t.rows.map(([before, now], i) => (
        <div role="row" key={before} className="grid gap-2 rounded-[12px] border border-rule bg-surface p-4 sm:contents">
          <span role="cell" className="flex min-w-0 items-center gap-3 text-muted sm:border-b sm:border-rule sm:py-3 sm:pr-3.5">
            <Cross />
            <span className="min-w-0">
              <span className="legend block text-[10.5px] sm:hidden">{t.before}</span>
              {before}
            </span>
          </span>
          <span aria-hidden="true" className="pl-[7px] font-mono text-sm leading-none text-muted sm:hidden">↓</span>
          <span role="cell" className="flex min-w-0 items-center gap-3 font-display font-semibold sm:border-b sm:border-rule sm:py-3 sm:pr-3.5">
            <m.span
              className="grid flex-none place-items-center"
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.09, type: "spring", stiffness: 420, damping: 22 }}
            >
              <Check />
            </m.span>
            <span className="min-w-0">
              <span className="legend block text-[10.5px] font-normal sm:hidden">{t.now}</span>
              {now}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
