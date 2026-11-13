"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type TrackedEvent = "cv" | "email" | "github" | "linkedin" | "repo";

/** Reports a recruiter action to Google Analytics when enabled in production. */
export function trackClick(event: TrackedEvent, props: { from: string; lang: string }) {
  if ("dataLayer" in window) sendGAEvent("event", event, props);
}

// A link that reports its click, so recruiter actions can be counted.
export function TrackedLink({ event, from, lang, onClick, ...props }: React.ComponentProps<"a"> & { event: TrackedEvent; from: string; lang: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackClick(event, { from, lang });
        onClick?.(e);
      }}
    />
  );
}
