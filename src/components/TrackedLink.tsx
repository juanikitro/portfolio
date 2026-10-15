"use client";

import { track } from "@vercel/analytics";

export type TrackedEvent = "cv" | "email" | "github" | "linkedin" | "repo";

// A link that reports its click as a Vercel Analytics custom event, so recruiter actions can be counted.
// Pro allows 2 properties per event: where the link was and the page language.
export function TrackedLink({ event, from, lang, onClick, ...props }: React.ComponentProps<"a"> & { event: TrackedEvent; from: string; lang: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { from, lang });
        onClick?.(e);
      }}
    />
  );
}
