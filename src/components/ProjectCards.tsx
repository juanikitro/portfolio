import Link from "next/link";
import type { Dictionary } from "@/content";
import { href, type Locale } from "@/i18n";
import { Reveal } from "./Reveal";

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c, i) => (
        <span key={c} className={`whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[11px] sm:px-2.5 sm:text-[11.5px] ${i === 0 ? "bg-route-bg text-route" : "border border-rule"}`}>
          {c}
        </span>
      ))}
    </div>
  );
}

function SisocMap({ apps }: { apps: [string, string, string] }) {
  return (
    <svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block size-full">
      <g fill="none" stroke="var(--contour)" strokeWidth="1.2" className="contour-drift">
        <ellipse cx="200" cy="95" rx="170" ry="70" /><ellipse cx="200" cy="95" rx="125" ry="50" /><ellipse cx="200" cy="95" rx="80" ry="32" />
      </g>
      <path d="M30 150 H90 Q105 150 116 139 L160 95 Q170 85 184 85 H200" stroke="var(--route)" strokeWidth="5" fill="none" strokeLinecap="round" />
      {["M200 85 L262 40 H320", "M200 85 H330 Q345 85 352 98 L362 118", "M200 85 L250 140 H300"].map((d) => (
        <path key={d} className="sat-line" d={d} stroke="var(--line-f)" strokeWidth="2.5" fill="none" strokeDasharray="6 4" />
      ))}
      <g fill="var(--surface)" stroke="var(--line-f)" strokeWidth="3">
        <circle cx="320" cy="40" r="5.5" /><circle cx="362" cy="118" r="5.5" /><circle cx="300" cy="140" r="5.5" />
      </g>
      <g fontSize="11" fill="var(--muted)" className="font-mono">
        <text x="320" y="28" textAnchor="middle">{apps[0]}</text>
        <text x="362" y="138" textAnchor="middle">{apps[1]}</text>
        <text x="300" y="160" textAnchor="middle">{apps[2]}</text>
      </g>
      <circle className="pulse-ring" cx="200" cy="85" r="9" fill="var(--route)" opacity=".5" />
      <circle cx="200" cy="85" r="8" fill="var(--surface)" stroke="var(--route)" strokeWidth="4" />
      <text x="200" y="112" textAnchor="middle" fontSize="11" fill="var(--ink)" className="font-mono">SISOC</text>
    </svg>
  );
}

function ShineMap({ stops }: { stops: [string, string, string, string] }) {
  return (
    <svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block size-full">
      <g fill="none" stroke="var(--contour)" strokeWidth="1.2" className="contour-drift">
        <circle cx="277" cy="83" r="90" /><circle cx="277" cy="83" r="58" /><circle cx="277" cy="83" r="28" />
      </g>
      {/* the line runs straight into the terminal's center, so it meets the ring cleanly */}
      <path d="M30 60 H110 Q125 60 136 71 L170 105 Q180 115 194 115 H230 Q245 115 256 104 L277 83" stroke="var(--line-f)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g fill="var(--surface)" stroke="var(--line-f)" strokeWidth="3"><circle cx="70" cy="60" r="5" /><circle cx="153" cy="88" r="5" /><circle cx="212" cy="115" r="5" /></g>
      <g fontSize="11" fill="var(--muted)" className="font-mono">
        <text x="70" y="48" textAnchor="middle">{stops[0]}</text>
        <text x="163" y="85">{stops[1]}</text>
        <text x="212" y="135" textAnchor="middle">{stops[2]}</text>
      </g>
      <circle className="pulse-ring" cx="277" cy="83" r="9" fill="var(--line-f)" opacity=".5" />
      <circle cx="277" cy="83" r="8" fill="var(--surface)" stroke="var(--line-f)" strokeWidth="4" />
      <text x="277" y="64" textAnchor="middle" fontSize="11" fill="var(--ink)" className="font-mono">{stops[3]}</text>
    </svg>
  );
}

export function ProjectCards({ lang, t }: { lang: Locale; t: Dictionary }) {
  const cards = [
    { name: "SISOC", to: href(lang, "/sisoc"), chips: t.work.sisoc.chips, body: t.work.sisoc.body, map: <SisocMap apps={t.work.sisoc.apps} /> },
    { name: "ShineApp", to: href(lang, "/shineapp"), chips: t.work.shine.chips, body: t.work.shine.body, map: <ShineMap stops={t.work.shine.stops} /> },
  ];
  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-20 pt-16 md:pt-24">
      <span className="legend">{t.work.label}</span>
      <h2 id="work-h" className="mb-7 mt-2 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">{t.work.title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08} className="h-full">
            <Link href={c.to} className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-rule bg-surface no-underline transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_var(--ink)]">
              <div className="aspect-[16/7] max-w-full border-b border-rule">{c.map}</div>
              <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-5 pb-6 pt-5">
                <Chips items={c.chips} />
                <h3 className="m-0 font-display text-[26px] font-extrabold tracking-[-0.01em]">{c.name}</h3>
                <p className="m-0 text-base text-ink-2">{c.body}</p>
                <span className="mt-auto pt-2 font-mono text-[13px] text-route">{t.work.readCase} →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
