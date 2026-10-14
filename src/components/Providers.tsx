"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

// One place for motion defaults: lazy-loaded features, and animations reduced when the OS asks for it.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
