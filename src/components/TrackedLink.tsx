"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";

export type TrackedEvent = "cv" | "email" | "github" | "linkedin" | "repo";

/** Reports a recruiter action to Vercel Analytics and, where it is loaded (production only), Google Analytics. */
export function trackClick(event: TrackedEvent, props: { from: string; lang: string }) {
  track(event, props); // Pro allows 2 properties per event
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
