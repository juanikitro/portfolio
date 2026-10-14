"use client";

import * as m from "motion/react-m";
import type { Dictionary } from "@/content";

// The one place the stamp red is allowed: the production incident.
export function IncidentReport({ t, label }: { t: Dictionary["sisoc"]["incident"]; label: string }) {
  const cols = [t.happened, t.did, t.changed];
  return (
    <article aria-labelledby="incident-h" className="relative rounded-[14px] border-2 border-ink bg-surface p-5 sm:p-8">
      <m.span
        aria-hidden="true"
        className="absolute -top-3 right-3 rotate-[-6deg] border-[3px] border-stamp bg-surface px-2 py-0.5 font-display text-sm font-black tracking-[0.1em] text-stamp sm:right-6 sm:top-5 sm:bg-transparent sm:px-3 sm:text-base"
        initial={{ scale: 1.8, opacity: 0, rotate: -6 }}
        whileInView={{ scale: 1, opacity: 1, rotate: -6 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.25 }}
      >
        {t.stamp}
      </m.span>
      <span className="legend block pr-10 sm:pr-32">{label} - {t.label}</span>
      <h2 id="incident-h" className="mb-5 mt-2 text-balance font-display sm:max-w-[20ch] sm:pr-24 text-[clamp(1.5rem,3.4vw,2.4rem)] font-black leading-[1.05] tracking-[-0.02em]">{t.title}</h2>
      <div className="grid gap-5 text-[15.5px] md:grid-cols-3">
        {cols.map(([h, body]) => (
          <div key={h}>
            <b className="mb-1 block font-mono text-xs uppercase tracking-[0.08em] text-muted">{h}</b>
            {body}
          </div>
        ))}
      </div>
    </article>
  );
}
