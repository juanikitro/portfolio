"use client";

import * as m from "motion/react-m";

// Fades content up when it scrolls into view. Only for content below the fold:
// above-the-fold content must be visible on first paint.
export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "article" | "li" }) {
  const Tag = m[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </Tag>
  );
}
