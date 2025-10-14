# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit 5 single-page application for Camps Breakerz (CB Crew), a Palestinian dance community organization based in Gaza. The site showcases their history, programs, and provides ways to support their mission through donations and merchandise.

**Key Technologies:**
- SvelteKit 5 with Svelte 5 runes (`$state`, `$props`)
- TypeScript with strict mode
- Tailwind CSS 4.0 with DaisyUI (beta v5.0)
- Vite 6.0
- Deployed on Vercel using `@sveltejs/adapter-vercel`

## Common Commands

### Development
```bash
npm run dev              # Start dev server
npm run dev -- --open    # Start dev server and open in browser
```

### Building & Preview
```bash
npm run build            # Build for production
npm run preview          # Preview production build locally
```

### Code Quality
```bash
npm run check            # Run svelte-check for type checking
npm run check:watch      # Run svelte-check in watch mode
npm run format           # Format code with Prettier
npm run lint             # Check formatting with Prettier
```

### SvelteKit
```bash
npm run prepare          # Sync SvelteKit types (runs automatically on install)
```

## Architecture

### Single-Page Application Structure

The app is structured as a true single-page application with all content sections rendered on one page:

- **Entry Point**: `src/routes/+page.svelte` → renders `SinglePageApplication` component
- **Layout**: `src/routes/+layout.svelte` → applies global styles (`app.css`) and renders footer
- **Main Content**: `src/lib/ui/pages/single-page-application.svelte` → composes all sections

### Component Organization (Atomic Design Pattern)

Components follow atomic design principles in `src/lib/ui/`:

```
atoms/           - Basic UI elements (buttons, icons, enhanced images)
molecules/       - Simple composed components (iconify, header-video)
organisms/       - Complex composed components (navbar, footer, widgets)
sections/        - Full page sections (landing, timeline, contact, shop)
containers/      - Layout components (stack)
pages/           - Page-level compositions (single-page-application)
```

### State Management

- **VideoManager**: Global singleton for video playback state located at `src/lib/use-video-manager.svelte.ts`
  - Uses Svelte 5 `$state` runes
  - Manages autoplay, video playing state, and video element reference
  - Accessed via `useVideoManager()` hook
  - Randomly selects 1 of 10 background videos on load

### Data Management

Content is stored as structured TypeScript data in `src/lib/`:

- **siteData.ts**: Navigation links, contact links, and social media (includes TypeScript types)
- **about-us.data.ts**: Timeline events with images (historical milestones from 2004-present)
- **food-baskets.data.ts**: Donation options

### Styling

- **Tailwind CSS 4.0**: Configured via `@tailwindcss/vite` plugin (no separate config file)
- **DaisyUI Beta**: Theme customization in `src/app.css` with custom dark theme
- **Custom Animations**: Defined in `app.css` (fadeIn, revealFromTop, revealFromTopAndScale, revealFromLeft)
- **Custom Font**: TTOctosquares variable font loaded from `static/fonts/`
- **CSS Variables**: `--font-brand`, `--font-mono` defined in `:root`

### Static Assets

Located in `static/` directory:
- `/video/` - 10 background videos (cb_01 through cb_10) in .mp4 and .webm formats
- `/images/` - Organized by program/initiative subdirectories
- `/fonts/` - Custom brand typography

### TypeScript Configuration

- **Strict mode enabled** (`strict: true`)
- **Module resolution**: `bundler` (SvelteKit default)
- **Path aliases**: `$lib` maps to `src/lib` (SvelteKit convention)
- **Global types**: Defined in `src/app.d.ts`
  - `App.IconType` - Union type for icon identifiers
  - `Vue.*` namespace - Legacy types from previous Vue implementation (can be ignored or cleaned up)

## Important Notes

### Svelte 5 Migration

This project uses **Svelte 5** syntax. Key differences from Svelte 4:
- Use `$state()` instead of `let` for reactive variables
- Use `$props()` instead of `export let` for component props
- Use `{@render children()}` instead of `<slot />` for content projection
- Classes with `$state` properties work for shared state (see VideoManager)

Refer to: https://svelte.dev/docs/svelte/v5-migration-guide

### SvelteKit Conventions

- **Routes**: File-based routing in `src/routes/`
- **$lib alias**: All imports from `src/lib/` use `$lib/` prefix
- **Enhanced images**: Use `@sveltejs/enhanced-img` for optimized images
- **Adapter**: Configured for Vercel static deployment

### DaisyUI Beta Version

Using `daisyui@5.0.0-beta.8` with Tailwind 4.0. Theme configuration syntax differs from stable versions - all theme config is in `app.css` using `@plugin` directives.

### Video Asset Management

The VideoManager randomly selects one of 10 videos (cb_01 through cb_10) on page load. Videos are stored in both MP4 and WebM formats for browser compatibility. Path pattern: `/video/cb_0${randomId}` where randomId is 1-10.
