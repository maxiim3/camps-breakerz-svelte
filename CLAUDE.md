# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit 5 single-page application for Camps Breakerz (CB Crew), a Palestinian dance community from Gaza. Showcases their history, programs, and support options.

**Stack:** SvelteKit 5 + Svelte 5 runes, TypeScript (strict), Tailwind CSS 4 + DaisyUI 5 beta, Vite 6, Vercel deployment

## Commands

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun run check        # Type checking (svelte-check)
bun run format       # Format with Prettier
bun run lint         # Check formatting (Prettier)
```

No test framework is configured.

## Architecture

### Rendering Flow

- `+layout.svelte` — imports `app.css`, renders children + `AppFooter`
- `+page.svelte` — renders `SinglePageApplication` component
- `SinglePageApplication` — composes all page sections (landing, timeline, healing programs/donate, contact, shop)

### Component Organization (Atomic Design in `src/lib/ui/`)

- `atoms/` — Basic elements (buttons, icons, images)
- `molecules/` — Small compositions (iconify, header-video)
- `organisms/` — Complex components (navbar, footer)
- `sections/` — Full page sections (landing, timeline, healing-programs, contact, shop)
- `containers/` — Layout wrappers
- `pages/` — Page-level compositions (`single-page-application.svelte`)

### State Management

**VideoManager** (`src/lib/use-video-manager.svelte.ts`): Singleton class using Svelte 5 `$state` runes for background video playback. Randomly picks 1 of 10 videos on load. Access via `useVideoManager()`.

### Data Files (`src/lib/`)

- `siteData.ts` — Navigation links, contact links, social media (typed)
- `about-us.data.ts` — Timeline events (2004–2024)

### Styling

- **Tailwind CSS 4**: CSS-based config via `@tailwindcss/vite` plugin — no `tailwind.config.js`
- **DaisyUI 5 beta**: Single dark theme configured in `src/app.css` via `@plugin` directives
- **Custom font**: TTOctosquares variable font (`static/fonts/`), referenced as `--font-brand`
- **Animations**: Defined in `src/app.css` — fadeIn, revealFromTop, revealFromTopAndScale, revealFromLeft

### Vite Plugins (`vite.config.ts`)

Three plugins in order: `sveltekit()`, `tailwindcss()`, `enhancedImages()`

## Svelte 5 Syntax

- `$state()` instead of `let` for reactivity
- `$props()` instead of `export let`
- `{@render children()}` instead of `<slot />`

Reference: https://svelte.dev/docs/svelte/v5-migration-guide

### Routing

- `+error.svelte` — Styled error page (status code, message, back-to-home button)
- `[...rest]/+page.server.ts` — Catch-all redirect to `/` for unknown routes

## Notes

- **Global types** in `src/app.d.ts`: `App.IconType` union for icon components. Also contains a legacy `Vue.*` namespace with types still used by data structures
- **Enhanced images**: Use `<enhanced:img>` from `@sveltejs/enhanced-img`
- **Static assets**: `/video/` has cb_01–cb_10 in MP4/WebM; `/images/` organized by program (colors_of_hope, healing_programs)
- **Footer** dynamically iterates over `contactLinks` from `siteData.ts` (filters out Email and Shop)
