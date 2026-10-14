"use client";

import { forwardRef, useEffect, type ReactNode, type RefObject } from "react";
import * as m from "motion/react-m";
import { animate, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";

// Shared timeline for hand-drawn diagrams: one progress value (0 → 1) that starts once the diagram
// is in view and always runs to the end. Every element maps its own window of that progress,
// so lines draw progressively and stations appear exactly when their line reaches them.
export function useDrawProgress(ref: RefObject<Element | null>, seconds: number) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const progress = useMotionValue(0);
  useEffect(() => {
    if (reduce) progress.set(1);
    else if (inView) animate(progress, 1, { duration: seconds, ease: "linear" });
  }, [inView, reduce, progress, seconds]);
  return progress;
}

const smooth = (u: number) => u * u * (3 - 2 * u);

/** Inverse of the in-window easing: where in the window the ink reaches a fraction `f` of the path. */
export function invSmooth(f: number) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (smooth(mid) < f) lo = mid;
    else hi = mid;
  }
  return lo;
}

type DrawPathProps = { d: string; stroke: string; width: number; progress: MotionValue<number>; from: number; to: number; dash?: string };

/** A path that draws itself between progress `from` and `to` (eased inside its own window). */
export const DrawPath = forwardRef<SVGPathElement, DrawPathProps>(function DrawPath({ d, stroke, width, progress, from, to }, ref) {
  const length = useTransform(progress, [from, to], [0, 1], { ease: smooth });
  // a round line cap still paints a dot at length 0, so hide the path until it starts drawing
  const opacity = useTransform(length, (v) => (v > 0.001 ? 1 : 0));
  return <m.path ref={ref} d={d} stroke={stroke} strokeWidth={width} fill="none" style={{ pathLength: length, opacity }} />;
});

/** Content that pops in (fade + scale from its own center) when progress reaches `at`. */
export function Appear({ progress, at, children, span = 0.04 }: { progress: MotionValue<number>; at: number; children: ReactNode; span?: number }) {
  const a = Math.min(at, 1 - span * 2); // keep the whole pop inside the timeline so it never freezes mid-overshoot
  const opacity = useTransform(progress, [a, a + span], [0, 1]);
  const scale = useTransform(progress, [a, a + span, a + span * 2], [0.4, 1.15, 1]);
  return (
    <m.g style={{ opacity, scale, transformBox: "fill-box", transformOrigin: "center" }}>
      {children}
    </m.g>
  );
}

/** Text that fades in when progress reaches `at` (no scaling, so labels stay crisp). */
export function FadeIn({ progress, at, children, span = 0.05 }: { progress: MotionValue<number>; at: number; children: ReactNode; span?: number }) {
  const a = Math.min(at, 1 - span);
  const opacity = useTransform(progress, [a, a + span], [0, 1]);
  return <m.g style={{ opacity }}>{children}</m.g>;
}
