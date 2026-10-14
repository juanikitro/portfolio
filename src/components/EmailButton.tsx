"use client";

import { useState } from "react";

// On touch devices the mailto opens the mail app. With a mouse, a mailto often opens nothing useful,
// so the click copies the address instead and says so.
export function EmailButton({ email, label, copied, className }: { email: string; label: string; copied: string; className: string }) {
  const [done, setDone] = useState(false);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (matchMedia("(pointer: coarse)").matches) return; // let the mailto through
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`; // clipboard blocked: fall back to the mail app
    }
  }

  return (
    <a href={`mailto:${email}`} onClick={onClick} className={className} aria-live="polite">
      {done ? `✓ ${copied}` : label}
    </a>
  );
}
