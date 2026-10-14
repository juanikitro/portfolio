"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Effective theme: an explicit choice on <html data-theme> wins; otherwise the OS preference.
function read(): Theme {
  const v = document.documentElement.dataset.theme;
  if (v === "light" || v === "dark") return v;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

const Sun = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export function ThemeToggle({ labels }: { labels: { toLight: string; toDark: string } }) {
  // Server snapshot is null: the icon appears after hydration, so it never shows the wrong one.
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? labels.toLight : labels.toDark;

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-rule bg-surface text-ink transition-colors hover:border-route"
    >
      {theme === null ? null : theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
