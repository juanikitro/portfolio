# juanikitro — portfolio

Personal portfolio of Juan Ignacio Portilla Kitroser. Next.js 16 (App Router, static), TypeScript, Tailwind v4, Motion.

## Commands

```bash
npm run dev          # local dev server
npm run lint         # eslint
npm run typecheck    # route types + tsc
npm run build        # production build
npm run test:e2e     # Playwright smoke tests (desktop + mobile) against the build on :3100
```

## Structure

- `src/app/[lang]/` — pages. English is served at `/`, `/sisoc`, `/shineapp` (rewritten to `/en/*`); Spanish at `/es/*`.
- `src/content/` — all copy, typed. `en.ts` and `es.ts` must stay in sync (`Dictionary` type enforces it).
- `src/components/` — sections and diagrams (transit map, pipeline, flow line), all hand-built SVG.
- `src/app/globals.css` — color tokens (OKLCH) for light and dark, mapped to Tailwind.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the final domain (used for canonical URLs, sitemap and robots).
