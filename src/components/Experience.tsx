"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/content";
import { RichText } from "./RichText";

// Career as a transit line, newest at the top. While scrolling, a "train" travels the line
// from the oldest job (bottom) to now (top), and each station lights up as it passes.
export function Experience({ t, sisocHref }: { t: Dictionary["experience"]; sisocHref: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start end", "end end"] });
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const fill = useTransform(progress, (v) => `${v * 100}%`);
  const n = t.items.length;
  const [reached, setReached] = useState(reduce ? n : 0);

  const trackRef = useRef<HTMLSpanElement>(null);
  const stationRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useMotionValueEvent(progress, "change", (v) => {
    // A station is lit once the train (head of the fill) has passed its center. Jobs have different
    // heights, so this reads real positions instead of assuming even spacing.
    const track = trackRef.current?.getBoundingClientRect();
    if (!track) return;
    const trainY = track.bottom - v * track.height;
    const count = stationRefs.current.filter((s) => {
      const r = s?.getBoundingClientRect();
      return r && r.top + r.height / 2 >= trainY - 1;
    }).length;
    if (count !== reached) setReached(count);
  });

  return (
    <section id="experience" aria-labelledby="exp-h" className="scroll-mt-20 pt-16 md:pt-24">
      <span className="legend">{t.label}</span>
      <div className="grid gap-x-14 md:grid-cols-[5fr_7fr]">
        <div>
          <h2 id="exp-h" className="mb-4 mt-2 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">{t.title}</h2>
          <p className="m-0 max-w-[48ch] text-ink-2">{t.intro}</p>
        </div>
        <ol ref={listRef} className="relative m-0 mt-8 grid list-none gap-7 p-0 md:mt-2">
          {/* track, filled part, and the train at the head of the fill */}
          <span ref={trackRef} aria-hidden="true" className="absolute bottom-4 left-[7px] top-3 w-1 rounded bg-rule">
            <m.span className="absolute inset-x-0 bottom-0 rounded bg-ink" style={{ height: fill }} />
            <m.span className="absolute left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-route shadow-[0_0_0_4px_var(--route-bg)]" style={{ bottom: fill }} />
          </span>
          {t.items.map((it, i) => {
            const lit = n - i <= reached;
            return (
              <li key={it.org} className="relative pl-10">
                <m.span
                  ref={(el) => { stationRefs.current[i] = el; }}
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 size-[18px] rounded-full border-4 bg-surface transition-colors duration-300 ${lit ? (i === 0 ? "border-route" : "border-ink") : "border-rule"}`}
                  animate={lit ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                />
                <m.div
                  data-reveal
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-mono text-xs text-muted">{it.period}</span>
                  <h3 className="m-0 font-display text-lg font-extrabold leading-snug">{it.org}</h3>
                  <p className="m-0 font-display text-[15px] text-ink-2">{it.role}</p>
                  {it.note && <p className="m-0 mt-1 text-[15.5px]"><RichText text={it.note} highlight={["SOAC", "SISOC"]} /></p>}
                  {i === 0 && (
                    <Link href={sisocHref} className="mt-1 inline-flex min-h-10 items-center font-mono text-[13px] text-route no-underline hover:underline">
                      {t.sisocCta} →
                    </Link>
                  )}
                </m.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
