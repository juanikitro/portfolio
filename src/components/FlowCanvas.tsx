"use client";

import { useEffect, useRef } from "react";

// "Currents": particles follow a slowly shifting flow field and leave short trails, like a wind map.
// The cursor is an eddy: nearby particles swirl around it and take the route color.
// Trails are redrawn from each particle's recent positions every frame (no canvas smearing),
// so the background stays clean in both themes. Paused off-screen; static under reduced motion.
type P = { x: number; y: number; life: number; trail: number[]; hot: number };

const TRAIL = 14;
const SPEED = 1.6;
const EDDY_RADIUS = 150;

export function FlowCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, t = 0, raf = 0, visible = true;
    let parts: P[] = [];
    let colors = { base: "", hot: "", accent: "" };
    const pointer = { x: 0, y: 0, active: false, strength: 0 };

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors = { base: css.getPropertyValue("--contour").trim(), hot: css.getPropertyValue("--route").trim(), accent: css.getPropertyValue("--line-f").trim() };
    };
    const spawn = (p?: P): P => {
      const n = p ?? { x: 0, y: 0, life: 0, trail: [], hot: 0 };
      n.x = Math.random() * w; n.y = Math.random() * h; n.life = 120 + Math.random() * 200; n.trail.length = 0; n.hot = 0;
      return n;
    };
    const size = () => {
      const r = canvas.getBoundingClientRect();
      const d = Math.min(2, devicePixelRatio || 1);
      w = r.width; h = r.height;
      canvas.width = w * d; canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const count = Math.min(1100, Math.round((w * h) / 1150));
      parts = Array.from({ length: count }, () => spawn());
    };

    const step = () => {
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.06;
      for (const p of parts) {
        const a = Math.sin(p.x * 0.0055 + t) * 1.6 + Math.cos(p.y * 0.0075 - t * 0.7) * 1.2;
        let vx = Math.cos(a) * SPEED, vy = Math.sin(a) * SPEED;
        if (pointer.strength > 0.01) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < EDDY_RADIUS && dist > 0.5) {
            const k = (1 - dist / EDDY_RADIUS) * pointer.strength;
            // tangential swirl plus a gentle push outwards
            vx += (-dy / dist) * 3.2 * k + (dx / dist) * 0.9 * k;
            vy += (dx / dist) * 3.2 * k + (dy / dist) * 0.9 * k;
            p.hot = Math.min(1, p.hot + 0.15 * k + 0.05);
          }
        }
        p.hot *= 0.97;
        p.trail.push(p.x, p.y);
        if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2);
        p.x += vx; p.y += vy; p.life--;
        if (p.life < 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) spawn(p);
      }
      t += 0.0022;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      parts.forEach((p, i) => {
        if (p.trail.length < 4) return;
        const accent = i % 11 === 0;
        ctx.strokeStyle = p.hot > 0.15 ? colors.hot : accent ? colors.accent : colors.base;
        ctx.globalAlpha = p.hot > 0.15 ? 0.35 + 0.6 * p.hot : accent ? 0.5 : 0.95;
        ctx.lineWidth = p.hot > 0.15 ? 1.6 : 1.2;
        ctx.beginPath();
        ctx.moveTo(p.trail[0], p.trail[1]);
        for (let k = 2; k < p.trail.length; k += 2) ctx.lineTo(p.trail[k], p.trail[k + 1]);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      step();
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch scrolling should not stir the field
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    const mo = new MutationObserver(() => { readColors(); if (reduce) draw(); });
    const onResize = () => { size(); if (reduce) { for (let i = 0; i < TRAIL; i++) step(); draw(); } };

    readColors();
    size();
    if (reduce) {
      // one still frame of streaks, no motion
      for (let i = 0; i < TRAIL; i++) step();
      draw();
    } else {
      io.observe(canvas);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
}
