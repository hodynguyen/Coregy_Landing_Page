# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Coregy, live at https://coregy.com.vn: production-grade AI agents that take over one repetitive workflow for SMEs in Australia, New Zealand and Singapore. The site's only conversion goal is booking a free 2-week pilot (the `#pilot` form). Next.js 14 App Router + Chakra UI v2 + Saas UI. No backend, no auth.

Deployed on Vercel (project `coregy_landing_page`) via GitHub integration: every push to `master` goes to production; other branches get preview deployments. Work on a branch and let the user review the preview before merging.

## Commands

```bash
npm run dev     # next dev on http://localhost:3000
npm run build   # production build (also type-checks)
npm run lint    # next lint (next/core-web-vitals)
npx prettier --write .   # format (no npm script for this)
```

There is no test suite. `package.json` declares `pnpm` as `packageManager`, but the committed lockfile is `package-lock.json` — use npm.

## Architecture

- **Routes** (`app/(marketing)/`, all wrapped in `MarketingLayout`): `/`, `/solutions/[slug]` (static params from `data/solutions.tsx`, `dynamicParams = false`), `/privacy`, `/terms`. Route files that need `metadata` are server components that render a `'use client'` page component (`SolutionPage`, `LegalPage`) by passing only a key/slug; the home page itself is a client component and gets its metadata from the root layout.
- **Copy lives in `data/`**, not in components: `config.tsx` (site name/URL, SEO, nav, footer, feature flags), `home.tsx`, `solutions.tsx`, `pricing.tsx`, `faq.tsx`, `pilot.ts`, `legal.ts`. `config.tsx` must stay free of component imports because `app/(marketing)/metadata.ts` (server) reads it.
- **Feature flags**: sections that need real proof are gated in `siteConfig.flags` (e.g. `showProof`). Never fill them with invented testimonials, logos or metrics; use `TODO(hody):` placeholders and list them in `TODO-HODY.md`.
- **Pilot form** (`components/pilot-form`): POSTs JSON to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree-compatible); if unset, falls back to a prefilled `mailto:`. It appears on the home page and every solution page under `id="pilot"`; `hooks/use-pilot-href.ts` decides whether CTAs link to `#pilot` or `/#pilot`.
- **Analytics**: `lib/analytics.ts` `track()` wraps Plausible, loaded in `app/layout.tsx` only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. Events: `cta_book_pilot_click` (`location`), `solution_card_click` (`solution`), `pilot_form_submit`.
- **Header nav scrollspy**: nav items in `data/config.tsx` with an `id` render as `/#<id>` and are highlighted (home page only) by matching a section with that `id`. Items with `children` render as a dropdown.
- **Theme** (`theme/`): `extendTheme` over Saas UI's base theme; light mode default (also hardcoded in `app/layout.tsx` for `ColorModeScript` — change both together). One accent palette (`primary`); keep cards flat (1px border, no gradients). A global `[id] { scroll-margin-top }` keeps anchors clear of the fixed header.
- **Open Graph images**: generated with `next/og` via `lib/og.tsx` — `app/opengraph-image.tsx` (home headline) and `app/(marketing)/solutions/[slug]/opengraph-image.tsx` (per-solution headline). The logo paths live in `data/logo-paths.ts`, shared with the `Logo` component.
- **SVG imports**: `next.config.mjs` routes `.svg` imports through `@svgr/webpack` (React components, not URLs).

## Conventions

- Path aliases: `#components/*`, `#hooks/*`, `#data/*`, `#lib/*`, `#theme`.
- Each component folder exports through an `index.ts` barrel.
- `ButtonLink` renders a Chakra `Button` as a Next `Link` (single `<a>`); use it for CTA links.
- Prettier: no semicolons, single quotes, trailing commas, 80 cols; imports auto-sorted (third-party, `react`, `#` aliases, relative).
- Copy rules: plain, concrete English; no buzzwords; must work at 375px with no horizontal scroll in both color modes.
