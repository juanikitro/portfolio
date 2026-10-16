"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import type { Dictionary } from "@/content";
import { Appear, DrawPath, FadeIn, invSmooth, useDrawProgress } from "./draw";

// SISOC as an octilinear transit map, on an 800×460 grid.
// - U: the user's path into the core.
// - I: external integrations, unrelated to each other. They reach the core through two trunks:
//   the three above merge into one, and so do the three below.
// - D: SISOC itself (core + programs) owns the right half.
// - F: the team-built field apps.
// Every line is drawn from the core outward, so each station (terminals included) appears only when
// its line reaches it. Once the map is complete, sample requests travel from the browser and back.

type Anchor = "start" | "middle" | "end";
type Station = { id: string; x: number; y: number; label: string; lx: number; ly: number; anchor: Anchor; sub?: string; sx?: number; sy?: number; bold?: boolean; size?: number };
type Line = { id: string; d: string; color: string; width: number; from: number; to: number; stations: Station[] };

const WIDE_LINES: Line[] = [
  {
    id: "user", color: "var(--ink)", width: 7, from: 0.03, to: 0.2, d: "M242 200 H240 Q220 200 206 214 L144 276 Q130 290 110 290 H40",
    stations: [
      { id: "nginx", x: 95, y: 290, label: "Nginx", lx: 95, ly: 272, anchor: "middle" },
      { id: "browser", x: 40, y: 290, label: "Browser", lx: 40, ly: 272, anchor: "middle" },
    ],
  },
  // integrations, upper trunk and its three branches
  { id: "itop", color: "var(--route)", width: 6, from: 0.04, to: 0.09, d: "M260 182 V120", stations: [] },
  {
    id: "renaper", color: "var(--route)", width: 6, from: 0.09, to: 0.24, d: "M260 120 H254 Q240 120 230 110 L204 84 Q190 70 170 70 H90",
    stations: [{ id: "renaper", x: 90, y: 70, label: "RENAPER", lx: 90, ly: 52, anchor: "middle", sub: "national identity registry", sx: 90, sy: 94 }],
  },
  {
    id: "gestionar", color: "var(--route)", width: 6, from: 0.09, to: 0.2, d: "M260 120 V30",
    stations: [{ id: "gestionar", x: 260, y: 30, label: "Field-management system", lx: 274, ly: 34, anchor: "start" }],
  },
  {
    id: "ticketing", color: "var(--route)", width: 6, from: 0.09, to: 0.23, d: "M260 120 Q270 120 280 110 L326 64 Q340 50 360 50 H390",
    stations: [{ id: "ticketing", x: 390, y: 50, label: "Ticketing system", lx: 404, ly: 54, anchor: "start" }],
  },
  // integrations, lower trunk and its three branches (they leave the trunk on one shared diagonal)
  { id: "ibottom", color: "var(--route)", width: 6, from: 0.06, to: 0.12, d: "M260 218 V300", stations: [] },
  {
    id: "webpush", color: "var(--route)", width: 6, from: 0.12, to: 0.24, d: "M260 300 L231 329 Q225 335 217 335 H110",
    stations: [{ id: "webpush", x: 110, y: 335, label: "Web push", lx: 110, ly: 318, anchor: "middle", size: 12 }],
  },
  {
    id: "smtp", color: "var(--route)", width: 6, from: 0.12, to: 0.27, d: "M260 300 L181 379 Q175 385 167 385 H70",
    stations: [{ id: "smtp", x: 70, y: 385, label: "SMTP", lx: 70, ly: 368, anchor: "middle", size: 12 }],
  },
  {
    id: "sentry", color: "var(--route)", width: 6, from: 0.12, to: 0.3, d: "M260 300 L131 429 Q125 435 117 435 H40",
    stations: [{ id: "sentry", x: 40, y: 435, label: "Sentry", lx: 40, ly: 455, anchor: "middle", size: 12 }],
  },
  {
    id: "sisoc", color: "var(--dev)", width: 10, from: 0.22, to: 0.7,
    d: "M278 200 H400 Q420 200 434 186 L500 120 Q514 106 534 106 H690 Q730 106 730 146 V350 Q730 370 710 370 H640",
    stations: [
      { id: "ciudadanos", x: 467, y: 153, label: "Ciudadanos", lx: 481, ly: 166, anchor: "start", bold: true },
      { id: "comedores", x: 552, y: 106, label: "Comedores", lx: 552, ly: 88, anchor: "middle", bold: true },
      { id: "vpsl", x: 620, y: 106, label: "VPSL", lx: 620, ly: 88, anchor: "middle", bold: true },
      { id: "pas", x: 680, y: 106, label: "PAS", lx: 680, ly: 88, anchor: "middle", bold: true },
      { id: "vat", x: 730, y: 214, label: "VAT", lx: 714, ly: 218, anchor: "end", bold: true },
      { id: "celiaquia", x: 730, y: 262, label: "Celiaquía", lx: 714, ly: 266, anchor: "end", bold: true },
      { id: "cdi", x: 730, y: 310, label: "CDI", lx: 714, ly: 314, anchor: "end", bold: true },
      { id: "cdf", x: 700, y: 370, label: "CDF", lx: 700, ly: 354, anchor: "middle", bold: true },
      { id: "dispositivos", x: 640, y: 370, label: "Dispositivos", lx: 640, ly: 354, anchor: "middle", bold: true },
    ],
  },
  {
    id: "field", color: "var(--line-f)", width: 7, from: 0.32, to: 0.6,
    d: "M260 200 L340 280 Q352 292 352 312 V330 Q352 350 372 350 H520 Q540 350 540 370 V400",
    stations: [
      { id: "espacios", x: 352, y: 318, label: "Espacios Comunitarios", lx: 366, ly: 322, anchor: "start", size: 12 },
      { id: "datacalle", x: 450, y: 350, label: "DataCalle", lx: 450, ly: 374, anchor: "middle", size: 12 },
      { id: "gestionar-app", x: 540, y: 400, label: "Gestionar", lx: 526, ly: 404, anchor: "end", size: 12 },
    ],
  },
];

// Phones: the same network turned into a portrait map (400x710), so it never needs side scrolling.
// Integrations stack above and to the left of the core; the SISOC line snakes down the right side.
const TALL_LINES: Line[] = [
  {
    id: "user", color: "var(--ink)", width: 7, from: 0.03, to: 0.2, d: "M182 300 H40",
    stations: [
      { id: "nginx", x: 110, y: 300, label: "Nginx", lx: 110, ly: 282, anchor: "middle" },
      { id: "browser", x: 40, y: 300, label: "Browser", lx: 40, ly: 282, anchor: "middle" },
    ],
  },
  { id: "itop", color: "var(--route)", width: 6, from: 0.04, to: 0.09, d: "M200 280 V220", stations: [] },
  {
    id: "renaper", color: "var(--route)", width: 6, from: 0.09, to: 0.24, d: "M200 220 L150 170 Q138 158 120 158 H60",
    stations: [{ id: "renaper", x: 60, y: 158, label: "RENAPER", lx: 60, ly: 140, anchor: "middle" }],
  },
  {
    id: "gestionar", color: "var(--route)", width: 6, from: 0.09, to: 0.2, d: "M200 220 V80",
    stations: [{ id: "gestionar", x: 200, y: 80, label: "Field-management system", lx: 200, ly: 62, anchor: "middle" }],
  },
  {
    id: "ticketing", color: "var(--route)", width: 6, from: 0.09, to: 0.23, d: "M200 220 L250 170 Q262 158 280 158 H340",
    stations: [{ id: "ticketing", x: 340, y: 158, label: "Ticketing system", lx: 340, ly: 140, anchor: "middle" }],
  },
  { id: "ibottom", color: "var(--route)", width: 6, from: 0.06, to: 0.12, d: "M200 320 V380", stations: [] },
  {
    id: "webpush", color: "var(--route)", width: 6, from: 0.12, to: 0.24, d: "M200 380 L174 406 Q170 410 164 410 H40",
    stations: [{ id: "webpush", x: 40, y: 410, label: "Web push", lx: 40, ly: 396, anchor: "middle", size: 12 }],
  },
  {
    id: "smtp", color: "var(--route)", width: 6, from: 0.12, to: 0.27, d: "M200 380 L134 446 Q130 450 124 450 H40",
    stations: [{ id: "smtp", x: 40, y: 450, label: "SMTP", lx: 40, ly: 436, anchor: "middle", size: 12 }],
  },
  {
    id: "sentry", color: "var(--route)", width: 6, from: 0.12, to: 0.3, d: "M200 380 L94 486 Q90 490 84 490 H40",
    stations: [{ id: "sentry", x: 40, y: 490, label: "Sentry", lx: 40, ly: 476, anchor: "middle", size: 12 }],
  },
  {
    id: "sisoc", color: "var(--dev)", width: 10, from: 0.22, to: 0.7,
    d: "M218 300 H300 Q360 300 360 360 V600 Q360 640 320 640 H140",
    stations: [
      { id: "ciudadanos", x: 270, y: 300, label: "Ciudadanos", lx: 270, ly: 282, anchor: "middle", bold: true },
      { id: "comedores", x: 360, y: 380, label: "Comedores", lx: 346, ly: 384, anchor: "end", bold: true },
      { id: "vpsl", x: 360, y: 430, label: "VPSL", lx: 346, ly: 434, anchor: "end", bold: true },
      { id: "pas", x: 360, y: 480, label: "PAS", lx: 346, ly: 484, anchor: "end", bold: true },
      { id: "vat", x: 360, y: 530, label: "VAT", lx: 346, ly: 534, anchor: "end", bold: true },
      { id: "celiaquia", x: 360, y: 580, label: "Celiaquía", lx: 346, ly: 584, anchor: "end", bold: true },
      { id: "cdi", x: 300, y: 640, label: "CDI", lx: 300, ly: 666, anchor: "middle", bold: true },
      { id: "cdf", x: 220, y: 640, label: "CDF", lx: 220, ly: 666, anchor: "middle", bold: true },
      { id: "dispositivos", x: 140, y: 640, label: "Dispositivos", lx: 140, ly: 666, anchor: "middle", bold: true },
    ],
  },
  {
    id: "field", color: "var(--line-f)", width: 7, from: 0.32, to: 0.6,
    d: "M210 320 L240 350 Q250 360 250 375 V620",
    stations: [
      { id: "espacios", x: 250, y: 520, label: "Espacios Comunitarios", lx: 236, ly: 524, anchor: "end", size: 12 },
      { id: "datacalle", x: 250, y: 570, label: "DataCalle", lx: 236, ly: 574, anchor: "end", size: 12 },
      { id: "gestionar-app", x: 250, y: 620, label: "Gestionar", lx: 236, ly: 624, anchor: "end", size: 12 },
    ],
  },
];

type Layout = {
  viewBox: string;
  svgClass: string;
  lines: Line[];
  core: { x: number; y: number };
  coreLabel: { x: number; y: number; anchor: Anchor };
  water: string;
  river?: { x: number; y: number };
  dots: [number, number][];
  more: { x: number; y: number };
  badges: { u: [number, number]; i: [number, number]; d: [number, number]; f: [number, number] };
};

const LAYOUTS: Record<"wide" | "tall", Layout> = {
  wide: {
    viewBox: "0 0 800 460",
    svgClass: "min-w-[720px]",
    lines: WIDE_LINES,
    core: { x: 242, y: 180 },
    coreLabel: { x: 318, y: 190, anchor: "start" },
    water: "M800 0 V460 H786 Q772 350 784 250 Q796 140 778 60 Q772 25 774 0 Z",
    river: { x: 791, y: 230 },
    dots: [[624, 370], [608, 370], [592, 370]],
    more: { x: 612, y: 396 },
    badges: { u: [14, 290], i: [66, 70], d: [572, 370], f: [540, 426] },
  },
  tall: {
    viewBox: "0 0 400 710",
    svgClass: "",
    lines: TALL_LINES,
    core: { x: 182, y: 280 },
    coreLabel: { x: 170, y: 262, anchor: "end" },
    water: "M400 0 V710 H390 Q382 520 392 350 Q399 190 388 0 Z",
    dots: [[124, 640], [108, 640], [92, 640]],
    more: { x: 92, y: 692 },
    badges: { u: [16, 300], i: [36, 158], d: [70, 640], f: [278, 612] },
  },
};

// below sm the portrait map is used; the server renders the wide one (the map is below the fold)
const narrowQuery = "(max-width: 639px)";
const subscribeNarrow = (cb: () => void) => {
  const mq = matchMedia(narrowQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useNarrow = () => useSyncExternalStore(subscribeNarrow, () => matchMedia(narrowQuery).matches, () => false);

const DRAW_SECONDS = 4.1;
const MORE_AT = 0.74;

// ---- sample requests -------------------------------------------------------------------------
// A node is reached from the core by following these lines outward (fraction from → to).
type Leg = [lineId: string, from: number, to: number];
const NODES: Record<string, (f: (station: string) => number) => Leg[]> = {
  browser: () => [["user", 0, 1]],
  ciudadanos: (f) => [["sisoc", 0, f("ciudadanos")]],
  comedores: (f) => [["sisoc", 0, f("comedores")]],
  cdi: (f) => [["sisoc", 0, f("cdi")]],
  renaper: () => [["itop", 0, 1], ["renaper", 0, 1]],
  gestionar: () => [["itop", 0, 1], ["gestionar", 0, 1]],
  smtp: () => [["ibottom", 0, 1], ["smtp", 0, 1]],
};
const ROUTES = [
  ["browser", "ciudadanos", "renaper", "ciudadanos", "browser"],
  ["browser", "gestionar", "comedores", "ciudadanos", "browser"],
  ["browser", "cdi", "smtp", "browser"],
];
const SPEED = 320; // viewBox units per second
const STOP_MS = 380;
const MAX_REQUESTS = 5;

function hop(from: Leg[], to: Leg[]): Leg[] {
  // two stops on the same single line: ride along it directly instead of going back to the core
  if (from.length === 1 && to.length === 1 && from[0][0] === to[0][0]) return [[from[0][0], from[0][2], to[0][2]]];
  const back = [...from].reverse().map(([id, a, b]) => [id, b, a] as Leg);
  return [...back, ...to];
}

function StationMark({ s, color, big, at, progress }: { s: Station; color: string; big: boolean; at: number; progress: MotionValue<number> }) {
  return (
    <>
      <Appear progress={progress} at={at}>
        <circle cx={s.x} cy={s.y} r={big ? 8 : 7} fill="var(--surface)" stroke={color} strokeWidth={big ? 4 : 3.5} />
      </Appear>
      <FadeIn progress={progress} at={at}>
        <text x={s.lx} y={s.ly} textAnchor={s.anchor} fontSize={s.size ?? 13} fontWeight={s.bold ? 700 : 400}>{s.label}</text>
        {s.sub && <text x={s.sx} y={s.sy} textAnchor={s.anchor} fontSize={11} style={{ fill: "var(--muted)" }}>{s.sub}</text>}
      </FadeIn>
    </>
  );
}

function Badge({ x, y, r = 11, fill, color, letter, progress, at }: { x: number; y: number; r?: number; fill: string; color: string; letter: string; progress: MotionValue<number>; at: number }) {
  return (
    <Appear progress={progress} at={at}>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight={800} style={{ fill: color }}>{letter}</text>
    </Appear>
  );
}

export function MetroMap({ t }: { t: Dictionary["sisoc"]["map"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useDrawProgress(ref, DRAW_SECONDS);
  const reduce = useReducedMotion();
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  const dots = useRef<(SVGGElement | null)[]>([]);
  // fraction of each line's length at which each station sits; measured once from the real geometry
  const [fractions, setFractions] = useState<Record<string, number>>({});
  const [built, setBuilt] = useState(false);
  const layout = LAYOUTS[useNarrow() ? "tall" : "wide"];

  useLayoutEffect(() => {
    const out: Record<string, number> = {};
    for (const line of layout.lines) {
      const el = paths.current[line.id];
      if (!el) continue;
      const L = el.getTotalLength();
      const samples = Array.from({ length: 401 }, (_, i) => el.getPointAtLength((L * i) / 400));
      for (const s of line.stations) {
        let best = 0, bestD = Infinity;
        samples.forEach((p, i) => { const d = (p.x - s.x) ** 2 + (p.y - s.y) ** 2; if (d < bestD) { bestD = d; best = i; } });
        out[s.id] = best / 400;
      }
    }
    // measure-then-render: positions come from the rendered SVG paths, so they can only be read after layout
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFractions(out);
  }, [layout]);

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= 1 && !built) setBuilt(true);
  });

  // sample requests: once the map is complete, requests leave the browser now and then, visit a few stops
  // and come back. Up to MAX_REQUESTS travel at the same time, each on its own dot.
  useEffect(() => {
    const pool = dots.current.filter((d): d is SVGGElement => !!d);
    if (!built || reduce || pool.length === 0) return;
    let cancelled = false, visible = true;
    const rafs = new Set<number>();
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => { const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); };
    const free = [...pool];
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (ref.current) io.observe(ref.current);
    const f = (id: string) => fractions[id] ?? 1;

    const runLegs = (g: SVGGElement, legs: Leg[], done: () => void) => {
      const lens = legs.map(([id, a, b]) => Math.abs(b - a) * (paths.current[id]?.getTotalLength() ?? 0));
      const total = lens.reduce((acc, l) => acc + l, 0);
      const t0 = performance.now();
      const frame = (now: number) => {
        if (cancelled) return;
        const travelled = ((now - t0) / 1000) * SPEED;
        let dist = Math.min(travelled, total);
        let i = 0;
        while (i < legs.length - 1 && dist > lens[i]) { dist -= lens[i]; i++; }
        const [id, a, b] = legs[i];
        const el = paths.current[id];
        if (el) {
          const k = lens[i] ? dist / lens[i] : 1;
          const p = el.getPointAtLength((a + (b - a) * k) * el.getTotalLength());
          g.setAttribute("transform", `translate(${p.x} ${p.y})`);
        }
        if (travelled >= total) done();
        else { const r = requestAnimationFrame(frame); rafs.add(r); }
      };
      rafs.add(requestAnimationFrame(frame));
    };

    const launch = () => {
      const g = free.pop();
      if (!g) return;
      const stops = ROUTES[Math.floor(Math.random() * ROUTES.length)].map((n) => NODES[n](f));
      const start = paths.current.user?.getPointAtLength(paths.current.user.getTotalLength());
      if (start) g.setAttribute("transform", `translate(${start.x} ${start.y})`);
      g.style.opacity = "1";
      let k = 0;
      const next = () => {
        if (cancelled) return;
        if (k >= stops.length - 1) {
          g.style.opacity = "0";
          later(() => free.push(g), 300); // let it fade out before reusing the dot
          return;
        }
        const legs = hop(stops[k], stops[k + 1]);
        k++;
        runLegs(g, legs, () => later(next, STOP_MS));
      };
      later(next, 200);
    };

    // a new request every 0.7–2.2 s while the map is on screen and a dot is free
    const schedule = () => {
      if (cancelled) return;
      if (visible) launch();
      later(schedule, 700 + Math.random() * 1500);
    };
    later(schedule, 600);
    return () => {
      cancelled = true;
      rafs.forEach(cancelAnimationFrame);
      timers.forEach(clearTimeout);
      io.disconnect();
      pool.forEach((g) => { g.style.opacity = "0"; });
    };
  }, [built, reduce, fractions, layout]);

  const stationAt = (line: Line, s: Station) => {
    const f = fractions[s.id];
    if (f === undefined) return 2; // not measured yet: keep hidden
    return line.from + invSmooth(f) * (line.to - line.from);
  };

  return (
    <figure className="m-0">
      <div ref={ref} className="overflow-x-auto rounded-[14px] border border-rule bg-surface p-3 sm:p-6">
        <svg viewBox={layout.viewBox} fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-labelledby="metro-title" aria-describedby="metro-description" className={"metro mx-auto block h-auto w-full " + layout.svgClass}>
          <title id="metro-title">{t.title}</title>
          <desc id="metro-description">{t.description}</desc>
          <path d={layout.water} fill="var(--water)" stroke="none" />
          {layout.river && (
            <text x={layout.river.x} y={layout.river.y} fontSize="9" stroke="none" transform={"rotate(90 " + layout.river.x + " " + layout.river.y + ")"} textAnchor="middle" style={{ fill: "var(--muted)", letterSpacing: ".2em" }}>RÍO DE LA PLATA</text>
          )}

          {layout.lines.map((line) => (
            <DrawPath key={line.id + layout.viewBox} ref={(el) => { paths.current[line.id] = el; }} d={line.d} stroke={line.color} width={line.width} progress={progress} from={line.from} to={line.to} />
          ))}

          {/* the core is where everything starts */}
          <Appear progress={progress} at={0}>
            <rect x={layout.core.x} y={layout.core.y} width="36" height="40" rx="18" fill="var(--surface)" stroke="var(--dev)" strokeWidth={5} />
          </Appear>
          <FadeIn progress={progress} at={0}>
            <text x={layout.coreLabel.x} y={layout.coreLabel.y} textAnchor={layout.coreLabel.anchor} fontWeight={800} fontSize="15">Django core</text>
            <text x={layout.coreLabel.x} y={layout.coreLabel.y - 20} textAnchor={layout.coreLabel.anchor} fontSize="11" style={{ fill: "var(--muted)" }}>kernel - identity - proxy</text>
          </FadeIn>

          {layout.lines.map((line) =>
            line.stations.map((s) => <StationMark key={s.id + layout.viewBox} s={s} color={line.color} big={line.id === "sisoc"} at={stationAt(line, s)} progress={progress} />),
          )}

          {/* "and more programs": the D line keeps going, dot by dot */}
          {layout.dots.map(([x, y], i) => (
            <Appear key={x + "-" + y} progress={progress} at={MORE_AT + i * 0.03}>
              <circle cx={x} cy={y} r={4} fill="var(--dev)" opacity={0.75} />
            </Appear>
          ))}
          <FadeIn progress={progress} at={MORE_AT + 0.1}>
            <text x={layout.more.x} y={layout.more.y} textAnchor="middle" fontSize="11" style={{ fill: "var(--muted)" }}>{t.more}</text>
          </FadeIn>

          <Badge x={layout.badges.u[0]} y={layout.badges.u[1]} fill="var(--ink)" color="var(--paper)" letter="U" progress={progress} at={0.2} />
          <Badge x={layout.badges.i[0]} y={layout.badges.i[1]} fill="var(--route)" color="var(--paper)" letter="I" progress={progress} at={0.24} />
          <Badge x={layout.badges.d[0]} y={layout.badges.d[1]} r={12} fill="var(--dev)" color="var(--on-dev)" letter="D" progress={progress} at={MORE_AT + 0.1} />
          <Badge x={layout.badges.f[0]} y={layout.badges.f[1]} fill="var(--line-f)" color="var(--paper)" letter="F" progress={progress} at={0.6} />

          {/* sample requests, moved imperatively along the lines */}
          {Array.from({ length: MAX_REQUESTS }, (_, i) => (
            <g key={i} ref={(el) => { dots.current[i] = el; }} style={{ opacity: 0, transition: "opacity 300ms" }} aria-hidden="true">
              <circle r="11" fill="var(--route-bg)" opacity={0.9} />
              <circle r="5.5" fill="var(--ink)" stroke="var(--surface)" strokeWidth={2} />
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[12.5px] text-muted">
        {([["var(--ink)", t.legend.u], ["var(--dev)", t.legend.d], ["var(--route)", t.legend.i], ["var(--line-f)", t.legend.f]] as const).map(([c, l]) => (
          <span key={l} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-[5px] w-[22px] rounded" style={{ background: c }} />
            {l}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
