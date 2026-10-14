"use client";

import * as m from "motion/react-m";
import type { Dictionary } from "@/content";

// ShineApp's core flow as one transit line; the line extends across the stops as it enters the view.
// Horizontal from md up; on phones it runs vertically so nothing needs side scrolling.
export function FlowLine({ t }: { t: Dictionary["shine"]["flow"] }) {
  return (
    <figure className="m-0">
      <div className="rounded-[14px] border border-rule bg-surface p-4 sm:p-7 md:overflow-x-auto">
        <ol
          className="relative m-0 grid list-none gap-6 p-0 md:min-w-[820px] md:grid-cols-[repeat(var(--stops),minmax(0,1fr))] md:gap-0"
          style={{ "--stops": t.stops.length } as React.CSSProperties}
        >
          {/* horizontal line (md+) */}
          <m.span
            aria-hidden="true"
            className="absolute left-[7px] right-[7px] top-[9px] hidden h-1 origin-left rounded bg-line-f md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2 }}
          />
          {/* vertical line (phones) */}
          <m.span
            aria-hidden="true"
            className="absolute bottom-3 left-[5px] top-3 w-1 origin-top rounded bg-line-f md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          />
          {t.stops.map((s, i) => (
            <m.li
              key={s.name}
              className="relative pl-8 md:pl-0 md:pr-3.5 md:pt-8"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 + i * 0.18 }}
            >
              {/* the first stop is the public booking page: the line's open-air entrance, drawn in green */}
              <span aria-hidden="true" className={`absolute left-0 top-1 size-3.5 rounded-full border-[3px] bg-surface md:top-0.5 ${i === 0 ? "border-route" : "border-line-f"}`} />
              <b className="block font-display text-[17px] font-extrabold">{s.name}</b>
              <span className="text-[14.5px] text-ink-2">{s.note}</span>
            </m.li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
