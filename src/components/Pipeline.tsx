"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/content";
import { Appear, DrawPath, FadeIn, invSmooth, useDrawProgress } from "./draw";

// How a change reaches production, drawn like the rest of the site: a pull request fans out into
// the CI jobs (they run in parallel), merges back at my review, then rides the weekly release train
// through QA and staging to production, where I approve again.
// It draws itself once when it comes into view (lanes, review, release train). After that the CI lanes
// keep running: each one paints and unpaints in green on its own random 1–3 s cycle, like jobs that never stop.

const W = 1270;
const MID = 156; // y of the main line
const LANE_X0 = 130, LANE_X1 = 560, MERGE_X = 640;
const REVIEW_X = 690;
const DELIVERY = [810, 930, 1050, 1170];
const DRAW_SECONDS = 4.5;

// greedy word wrap so stop notes stay inside the space between stops
function wrap(note: string, max = 16): string[] {
  const lines: string[] = [];
  for (const word of note.split(" ")) {
    const last = lines[lines.length - 1];
    if (last !== undefined && (last + " " + word).length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

export function Pipeline({ t }: { t: Dictionary["sisoc"]["pipeline"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const checks = t.stages.filter((s) => !s.gate);
  const review = t.stages.find((s) => s.gate);
  const reduce = useReducedMotion();
  const progress = useDrawProgress(ref, DRAW_SECONDS);
  // one "running" value per CI job, created once (the number of jobs never changes)
  const [running] = useState(() => checks.map(() => motionValue(0)));
  const [drawn, setDrawn] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    if (v >= 1 && !drawn) setDrawn(true);
  });

  // after the first draw, every lane paints in and out on its own random 1–3 s rhythm, forever
  useEffect(() => {
    if (!drawn || reduce) return;
    let alive = true;
    const controls = new Set<{ stop: () => void }>();
    const cycle = (i: number) => {
      if (!alive) return;
      const paint = animate(running[i], 1, { duration: 1 + Math.random() * 2, ease: "easeInOut" });
      controls.add(paint);
      paint.then(() => {
        controls.delete(paint);
        if (!alive) return;
        const unpaint = animate(running[i], 0, { duration: 1 + Math.random() * 2, ease: "easeInOut", delay: Math.random() * 0.6 });
        controls.add(unpaint);
        unpaint.then(() => { controls.delete(unpaint); cycle(i); });
      });
    };
    const starts = running.map((_, i) => window.setTimeout(() => cycle(i), Math.random() * 1500));
    return () => { alive = false; starts.forEach(clearTimeout); controls.forEach((c) => c.stop()); };
  }, [drawn, reduce, running]);

  const gap = 26;
  const top = MID - ((checks.length - 1) * gap) / 2;
  const laneY = (i: number) => top + i * gap;
  const lastStop = DELIVERY[DELIVERY.length - 1];

  return (
    <div ref={ref} className="overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-surface">
      <div className="flex flex-wrap justify-between gap-2 border-b border-rule px-4 py-3">
        <h3 className="m-0 font-display text-[15px] font-extrabold">{t.title}</h3>
        <span className="font-mono text-[12.5px] text-muted">{t.release}</span>
      </div>
      <p className="m-0 px-4 pt-3 font-mono text-xs text-muted sm:hidden">{t.scrollHint}</p>
      <div className="overflow-x-auto p-3 sm:p-5">
        <svg viewBox={`0 0 ${W} 320`} role="img" aria-label={t.title} fill="none" strokeLinecap="round" strokeLinejoin="round" className="block h-auto w-full min-w-[900px] font-mono">
          <text x={LANE_X0} y={top - 22} fontSize="11" letterSpacing="0.08em" style={{ fill: "var(--muted)" }}>{t.checks.toUpperCase()}</text>

          {/* PR node */}
          <Appear progress={progress} at={0}>
            <circle cx={36} cy={MID} r={16} fill="var(--ink)" />
            <text x={36} y={MID + 4} textAnchor="middle" fontSize="11" fontWeight={700} style={{ fill: "var(--paper)" }}>PR</text>
          </Appear>

          {/* parallel CI jobs: fan out, run, merge back; each turns green when it passes */}
          {checks.map((s, i) => {
            const y = laneY(i);
            const d = `M52 ${MID} C 90 ${MID}, 90 ${y}, ${LANE_X0} ${y} H ${LANE_X1} C ${LANE_X1 + 45} ${y}, ${MERGE_X - 45} ${MID}, ${MERGE_X} ${MID} H ${REVIEW_X - 12}`;
            const start = 0.03 + i * 0.012;
            return (
              <g key={s.name}>
                <DrawPath d={d} stroke="var(--rule)" width={2.5} progress={progress} from={start} to={start + 0.3} />
                <DrawPath d={d} stroke="var(--route)" width={3} progress={running[i]} from={0} to={1} />
                <FadeIn progress={progress} at={start + 0.08}>
                  <text x={LANE_X0 + 8} y={y - 5} fontSize="12" fontWeight={600} style={{ fill: "var(--ink)" }}>{s.name}</text>
                  <text x={LANE_X0 + 124} y={y - 5} fontSize="12" style={{ fill: "var(--muted)" }}>{s.note}</text>
                </FadeIn>
              </g>
            );
          })}

          {/* my review gate */}
          {review && (
            <>
              <Appear progress={progress} at={0.42}>
                <rect x={REVIEW_X - 12} y={MID - 12} width={24} height={24} rx={5} fill="var(--surface)" stroke="var(--ink)" strokeWidth={4} />
              </Appear>
              <FadeIn progress={progress} at={0.42}>
                <text x={REVIEW_X} y={MID - 24} textAnchor="middle" fontSize="12" fontWeight={700} style={{ fill: "var(--ink)" }}>{review.name}</text>
                {wrap(review.note).map((l, k) => (
                  <text key={l} x={REVIEW_X} y={MID + 34 + k * 14} textAnchor="middle" fontSize="11" style={{ fill: "var(--muted)" }}>{l}</text>
                ))}
              </FadeIn>
            </>
          )}

          {/* weekly release train */}
          <DrawPath d={`M${REVIEW_X + 12} ${MID} H ${lastStop}`} stroke="var(--route)" width={6} progress={progress} from={0.46} to={0.88} />
          <FadeIn progress={progress} at={0.5}>
            <path d={`M${DELIVERY[0]} 92 V 86 H ${lastStop} V 92`} stroke="var(--muted)" strokeWidth={1.2} />
            <text x={(DELIVERY[0] + lastStop) / 2} y={76} textAnchor="middle" fontSize="11" letterSpacing="0.08em" style={{ fill: "var(--muted)" }}>
              {t.delivery.toUpperCase()}
            </text>
          </FadeIn>
          {t.deliveryStages.map((s, i) => {
            const x = DELIVERY[i];
            // each stop appears when the train line's ink reaches it
            const f = (x - (REVIEW_X + 12)) / (lastStop - (REVIEW_X + 12));
            const at = 0.46 + invSmooth(f) * 0.42;
            return (
              <g key={s.name}>
                <Appear progress={progress} at={at}>
                  {s.gate ? (
                    <rect x={x - 12} y={MID - 12} width={24} height={24} rx={5} fill="var(--surface)" stroke="var(--ink)" strokeWidth={4} />
                  ) : (
                    <circle cx={x} cy={MID} r={8} fill="var(--surface)" stroke="var(--route)" strokeWidth={4} />
                  )}
                </Appear>
                <FadeIn progress={progress} at={at}>
                  <text x={x} y={MID - 24} textAnchor="middle" fontSize="12" fontWeight={700} style={{ fill: "var(--ink)" }}>{s.name}</text>
                  {wrap(s.note).map((l, k) => (
                    <text key={l} x={x} y={MID + 34 + k * 14} textAnchor="middle" fontSize="11" style={{ fill: "var(--muted)" }}>{l}</text>
                  ))}
                </FadeIn>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
