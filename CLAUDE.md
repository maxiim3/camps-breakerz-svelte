# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit 5 single-page application for Camps Breakerz (CB Crew), a Palestinian dance community from Gaza. Showcases their history, programs, and support options.

**Stack:** SvelteKit 5 + Svelte 5 runes, TypeScript (strict), Tailwind CSS 4 + DaisyUI beta, Vite 6, Vercel deployment

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type checking (svelte-check)
npm run format       # Format with Prettier
npm run lint         # Check formatting
```

**Note:** No test framework is configured.

## Architecture

### Single-Page App Flow
`src/routes/+page.svelte` → `SinglePageApplication` component → composes all sections

### Component Organization (Atomic Design in `src/lib/ui/`)
- `atoms/` - Basic elements (buttons, icons, images)
- `molecules/` - Simple compositions (iconify, header-video)
- `organisms/` - Complex components (navbar, footer, widgets)
- `sections/` - Full page sections (landing, timeline, contact, shop)
- `containers/` - Layout components
- `pages/` - Page-level compositions

### State Management
**VideoManager** (`src/lib/use-video-manager.svelte.ts`): Singleton using Svelte 5 `$state` runes for video playback. Randomly selects 1 of 10 background videos on load.

### Data Files (`src/lib/`)
- `siteData.ts` - Navigation, contacts, social links (with types)
- `about-us.data.ts` - Timeline events (2004-present)
- `food-baskets.data.ts` - Donation options

### Styling
- **Tailwind CSS 4**: No config file - uses `@tailwindcss/vite` plugin
- **DaisyUI beta**: Theme config in `src/app.css` via `@plugin` directives
- **Custom font**: TTOctosquares (`static/fonts/`)
- **Animations**: fadeIn, revealFromTop, revealFromTopAndScale, revealFromLeft

### Static Assets (`static/`)
- `/video/` - 10 videos (cb_01-cb_10) in MP4/WebM
- `/images/` - Organized by program
- `/fonts/` - Brand typography

## Svelte 5 Syntax

- `$state()` instead of `let` for reactivity
- `$props()` instead of `export let`
- `{@render children()}` instead of `<slot />`

Reference: https://svelte.dev/docs/svelte/v5-migration-guide

## Notes

- **No tailwind.config.js** - Tailwind 4 uses CSS-based config
- **Global types** in `src/app.d.ts`: `App.IconType` union, legacy `Vue.*` namespace (can be removed)
- **Enhanced images**: Use `@sveltejs/enhanced-img`
