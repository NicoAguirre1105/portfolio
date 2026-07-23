# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nicolás Aguirre's personal portfolio — a single-page Next.js site (Spanish copy) showcasing freelance frontend/B2B work: hero, project cards (with an expandable case-study overlay for the lead project), about section, contact form, footer.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js`)
- **Fonts**: `next/font/google` — Unbounded (headings), PT Sans (body), PT Mono (labels/numbers)
- **Language**: TypeScript, strict mode
- **Forms**: contact form posts to Formspree (`https://formspree.io/f/xnjebewe`) via `fetch` + `FormData`, no form library
- **Combobox/autocomplete**: `@headlessui/react` (`Combobox`) — the only UI dependency beyond Tailwind; used for the searchable country-code picker

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint (flat config: eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # Type-check only (no separate test suite/script exists in this repo)
```

There is no test framework configured — don't assume one exists when asked to "add tests."

## Architecture

- `app/page.tsx` is a thin `"use client"` composition root: it owns the two pieces of page-level state (`dark` theme toggle, `overlayOpen` case-study modal) and renders one component per page section in order. No routing library, no global state manager — plain `useState`/`useEffect` is enough for a one-page site.
- Page sections live in `app/components/` (one file per section: `Nav`, `Hero`, `ProjectsSection`, `AboutSection`, `ContactSection`, `Footer`, `ProjectOverlay`). Small presentational pieces used by more than one section (`Tag`, `Chip`, `Metric`, `ImagePlaceholder`, `Section`) live together in `app/components/ui.tsx` rather than one-file-each. `LanguageSwitcher` gets its own file since it's a standalone, reused-in-two-places unit.
- Copy and structured content (project descriptions, metrics, contact links, about text/stack) live in `app/data/content.ts`, not inline in JSX — components import from there. Add new project/section content there first, then reference it from the component.
- **Convention going forward**: keep new UI as components under `app/components/`, keep new copy/data under `app/data/`, and don't let `page.tsx` grow past being a composition root. Reuse an existing piece in `ui.tsx` before writing a new one-off `<span>`/`<div>` with repeated Tailwind classes.
- The overlay pushes/pops a URL hash (`#/proyectos/airecomprimido`) via `window.history.pushState` on open/close and closes on `Escape`, backdrop click, or its close button — see the `openOverlay`/`closeOverlay` handlers in `app/page.tsx`, passed down to `ProjectsSection`/`ProjectOverlay` as callbacks/props.
- Project image slots (`ImagePlaceholder`) are styled placeholders, not real screenshots — no project has a real image asset wired in yet.

### Theming (light/dark)

Dark mode is **not** implemented with `next-themes` or Tailwind's `dark:` variant. Instead:

- [app/globals.css](app/globals.css) defines every design token (`--color-bg`, `--color-ink`, `--color-b2b`, etc.) twice: once in `:root` (light) and once under `.dark` (dark), then re-exposes them through `@theme inline` so Tailwind generates matching utilities (`bg-bg`, `text-ink`, `bg-b2b-tag-bg`, ...).
- `app/page.tsx` toggles the `dark` class on `<html>` via `document.documentElement.classList.toggle("dark", dark)` in a `useEffect`. Every color utility resolves through the CSS variable at paint time, so components never need `dark:` prefixes.
- When adding new colors, add both the light and `.dark` variable definitions and the matching line in `@theme inline` — a variable defined in only one place will silently fall through to the wrong theme.

Nav/Hero/every section/Footer share one horizontal-padding rule (`clamp(20px,5vw,80px)`) via the `px-page` custom utility defined with `@utility` in `app/globals.css` — use that instead of repeating the `px-[clamp(...)]` arbitrary value.

### Tailwind + dynamic class names

Tailwind v4 only detects class names that appear as literal strings in source — it cannot see template-literal-constructed classes like `` `text-${color}` ``. Where a class must be chosen dynamically (see the `tagTones`/`metricColors` lookup objects in `app/components/ui.tsx`), map the variant to a **fully-written** class string in an object/switch first, then interpolate the lookup result. Don't reintroduce direct `` `text-${var}` `` interpolation.

### Contact form

`ContactSection` (`app/components/ContactSection.tsx`) is a real, wired-up form, not a mockup:

- Submission reads the form via `new FormData(e.currentTarget)` (uncontrolled inputs — every field needs a `name` attribute) and POSTs to Formspree with `Accept: application/json`. Status (`idle`/`sending`/`success`/`error`) drives the submit button's label/disabled state and an inline message; there's no toast library.
- The phone field is split into `CountryCodeSelect` (a Headless UI `Combobox`, see below) plus a plain `<input type="tel" name="phone">`. On submit, `countryCode` + `phone` are merged into a single `phone` value before POSTing so the Formspree notification shows one readable field instead of two.
- `CountryCodeSelect` (`app/components/CountryCodeSelect.tsx`) holds its own `selected`/`query` React state — it is **not** a native `<select>`, so `form.reset()` on a native form does nothing to it. `ContactSection` works around this with a `formKey` counter passed as the component's `key`, incremented on successful submit to remount it back to its default country. Any other non-native form control added later needs the same treatment (or its own reset handling) if the form is expected to fully clear after sending.
- The full country list (~195 countries, hand-maintained, Spanish names) lives in `countryCodes` in `app/data/content.ts` — this was a deliberate choice over pulling in a country-data package, since the repo already avoids new dependencies where a static list works. Keep it there rather than re-deriving it from a library later without reason.

### Design source (`design/`)

`design/Portafolio/` (repo root, **not** under `public/`) contains the original export from claude.ai/design (`Portafolio Nicolas Aguirre.dc.html`, `support.js`, `image-slot.js`, `uploads/`). It's a proprietary "DC" template format (`{{}}` placeholders + a custom `DCLogic` script block), not runnable HTML/React — it exists only as a visual reference for the implemented page and is not imported, built, or served. It's excluded from ESLint via `design/**` in `eslint.config.mjs` (the exported `support.js`/`image-slot.js` fail lint on their own, e.g. deprecated `ReactDOM.render`). Don't move it back under `public/` — that would both re-expose it publicly and reintroduce the lint failures.

### Browser preview

`.claude/launch.json` configures the `portfolio-dev` preview server (`npm run dev` on port 3000) for the Claude Code browser tool.

Never run `npm run build` while a `npm run dev` (Turbopack) instance is also running against this repo — both write to `.next/` and will corrupt Turbopack's filesystem cache (surfaces as a 500 with "Could not find the module ... in the React Client Manifest", or the dev server simply refusing to start). If that happens, stop the dev server and restart `npm run dev`; Turbopack detects the corruption and deletes/rebuilds its own cache.

### Verification workflow

- Run `npx tsc --noEmit` after any non-trivial change. It's cheap — do it before reaching for the browser.
- Only open the browser preview when the change is actually observable there (UI, styling, real interaction). Type-only, server-logic, or config/script changes stop at `tsc`.
- **Never take a screenshot** (no `computer` `screenshot`/`zoom` action) to verify a change — it's the most expensive step and the user checks the visual result themselves. Verify with text-based tools instead: `get_page_text`/`read_page` for structure and content, `read_console_messages` (errors only) and `read_network_requests` for failures, `javascript_tool` for anything else (e.g. reading a specific element's `className` or a computed style value).
- Inside `javascript_tool`, when checking that a route/endpoint didn't break, fetch only `status` (`fetch(url).then(r => r.status)`) — never the full response body. The one exception is reading the design mockups under `design/Portafolio/` (e.g. the `.dc.html`), where the full markup is the actual source of truth for what to implement.
- Prefer `Grep` for a specific pattern or `Read` with `offset`/`limit` over reading an entire large file when only a section is relevant.
- This repo defaults to `ponytail:` style — the simplest solution that works, reusing existing helpers/patterns (`ui.tsx`, `app/data/content.ts`) before adding new ones, with deliberate simplifications marked with a `ponytail:` comment.
