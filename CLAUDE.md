# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nicolás Aguirre's personal portfolio — a single-page Next.js site (Spanish copy) showcasing freelance frontend/B2B work: hero, project cards (with an expandable case-study overlay for the lead project), about section, contact form, footer.

**Copy voice**: all Spanish-language site copy (labels, placeholders, messages) must use Ecuadorian **tuteo** ("cuéntame", "tú", "escríbeme"), never rioplatense/Argentine **voseo** ("contame", "vos", "escribime"). The author is Ecuadorian; this applies to text written into the project's files, separate from whatever language Claude uses to talk to the user in chat.

**Current scope**: dark mode and multi-language (EN/RU) are intentionally out of the UI for now — first deliverable is a basic version for deploy. See [.claude/progreso.md](.claude/progreso.md) for what's in/out of scope and what's next.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js`)
- **Fonts**: `next/font/google` — Unbounded (headings), PT Sans (body), PT Mono (labels/numbers)
- **Language**: TypeScript, strict mode
- **Forms**: contact form posts to Formspree via `fetch` + `FormData`, no form library
- **Combobox/autocomplete**: `@headlessui/react` (`Combobox`) — the only UI dependency beyond Tailwind

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint (flat config: eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # Type-check only (no separate test suite/script exists in this repo)
```

There is no test framework configured — don't assume one exists when asked to "add tests."

## More docs (read only when the task needs them)

- **[.claude/arquitectura.md](.claude/arquitectura.md)** — component/file conventions, layout (max-width, hero height), theming internals, the contact form's moving parts, the `design/` source folder. Read when touching structure, CSS, or `ContactSection`.
- **[.claude/verificacion.md](.claude/verificacion.md)** — how to check a change in this repo (order of `tsc`/lint/browser, no screenshots, fetch minimalism) and the `ponytail:` default style. Read before verifying any non-trivial change.
- **[.claude/progreso.md](.claude/progreso.md)** — what's done, what's pending for the first deliverable, what's deferred to later (dark mode, i18n, project videos). Read at the start of a session to know where things stand, and update it as items close.
