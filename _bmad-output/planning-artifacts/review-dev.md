# Dev Review -- Epics & Stories

**Reviewer:** Amelia (Senior Software Engineer)
**Date:** 2025-02-05
**Status:** CHANGES REQUESTED

---

## Story 1.1 -- Remove Linktree

**Verdict: PASS with notes**

### File impact

- `src/lib/siteData.ts` L40-44: Delete `Linktree` entry. Also remove `import IconLink` at L4 since it becomes unused.
- `src/app.d.ts` L15: Remove `'inktree'` from `IconType` union.
- `src/lib/ui/molecules/iconify.svelte` L96-108: The `.inktree` CSS class is defined here. Must be removed or it becomes dead CSS.
- `src/lib/ui/atoms/icon-link.svelte`: Entire file. Confirmed via grep -- only imported in `siteData.ts`. Safe to delete.

### Missing AC

- Story does not mention cleaning up `iconify.svelte` `.inktree` CSS rule. It must, or dead code remains.
- No mention of verifying `contact-us.svelte` L39-51: it iterates `Object.entries(contactLinks)`. Removing Linktree is safe here (it filters only Email and Shop), but AC should confirm the "Follow us" section no longer shows Linktree.

### Gotcha

- The `IconType` value is `'inktree'` (typo) while the `contactLinks` key is `'Linktree'`. These are two separate things in two separate systems. Both must be removed. The story conflates them -- make sure implementer hits both.

---

## Story 1.2 -- Update YouTube URL

**Verdict: PASS with notes**

### File impact

- `src/lib/siteData.ts` L24: `@gazabboy` -> `@campsbreakerz`
- `src/lib/ui/organisms/app-footer.svelte` L25: Hardcoded `@gazabboy` -> `@campsbreakerz`

### Gotcha

- The footer is 100% hardcoded -- it does NOT consume `contactLinks` at all. This is a maintenance smell. Story should flag whether to refactor the footer to consume `contactLinks` (Story 1.3 adds TikTok to the footer too, compounding the problem). At minimum, AC should state: "Both `siteData.ts` and `app-footer.svelte` are updated and consistent."

---

## Story 1.3 -- Add TikTok

**Verdict: CHANGES REQUESTED**

### Missing AC / Blockers

1. **`iconify.svelte` needs a `.tiktok` CSS class.** The navbar uses `Iconify` (via `TheButton` -> `icon` prop -> `Iconify`) to render icons from the `IconType` union. If `'tiktok'` is added to `IconType` but no `.tiktok` CSS rule exists in `src/lib/ui/molecules/iconify.svelte`, the navbar icon will render as an empty span. Story does not mention this at all.

2. **Two icon systems in play.** `contactLinks` uses SVG component icons (`icon-tiktok.svelte`). The navbar uses CSS mask icons via `iconify.svelte`. Story 1.3 creates `icon-tiktok.svelte` (for contactLinks) but never mentions adding the CSS mask to `iconify.svelte`. If TikTok is ever added to `siteLinks` for nav, the iconify icon will be missing. AC must clarify: is TikTok nav-visible or contact-only?

3. **Footer is hardcoded.** Story says "Add TikTok to footer in `app-footer.svelte`" -- this means manually adding an `<a>` tag in the hardcoded footer HTML. AC should specify placement (after YouTube? After Facebook?). The footer currently has 3 links: Instagram, Facebook, YouTube.

4. **`ComponentType` import.** `siteData.ts` L7 imports `ComponentType` from `'svelte'`. In Svelte 5, `ComponentType` is deprecated in favor of `Component`. This works for now but will warn. Not a blocker, but note it.

### Dependency

- Must be done after Story 1.1 (Linktree removal) to avoid merge conflicts in `siteData.ts` and `app.d.ts`.

---

## Story 2.1 -- Add Colors of Hope images

**Verdict: PASS with notes**

### Missing AC

- No target dimensions or max file size specified for WebP conversion. Timeline images in existing data vary. AC should specify a target (e.g., max 1200px wide, quality 80).
- Story says "Convert 5 PNGs to optimized WebP" but does not specify the source PNGs. Are they provided by the client? Where do they live? AC must clarify source material location.
- Naming convention is not specified. Based on existing patterns (e.g., `colors_of_hope_01.webp` through `colors_of_hope_05.webp`), AC should make this explicit.

---

## Story 2.2 -- Add Colors of Hope timeline entry

**Verdict: PASS with notes**

### File impact

- `src/lib/about-us.data.ts`: Append new `Node` to `events[]`.

### Code-level concern

- `time-line.svelte` L63 calls `events.sort()` inline on every render. `.sort()` mutates the original array. This is an existing bug (not introduced by this story) but it means insertion order in the data file does not matter -- the sort is by `dateStart`. A 2024 entry will sort correctly.
- The `EnhancedImage` component at `src/lib/ui/atoms/enhanced-image.svelte` is actually a **plain `<img>` tag** (the `<enhanced:img>` is commented out at L29-33). So image optimization is NOT happening despite the component name. This is pre-existing but worth flagging -- new images won't be optimized at build time.

### Missing AC

- `description` field text is not provided in the story. AC must include the copy or reference a content source.
- `dateEnd` is not specified. Should it be `'current'` or omitted?

---

## Story 3.1 -- Add hero image

**Verdict: PASS**

### Notes

- Same concern as 2.1: no target dimensions/quality specified.
- Path `static/images/healing_programs/healing_programs_hero.webp` -- the directory `healing_programs/` does not exist yet. Must be created.

---

## Story 3.2 -- Replace Food Access section

**Verdict: CHANGES REQUESTED**

### Blockers

1. **GoFundMe URL looks malformed.** Story specifies `https://gofund.me/3799cb423` -- that trailing `3` looks suspicious. Standard gofund.me short links are 8 hex chars (e.g., `3799cb42`). The current embed URL in `go-fund-me-widget.svelte` L6 points to a completely different campaign (`basketsforgaza`). AC must provide the verified, correct URL.

2. **GoFundMe widget has a bug.** `go-fund-me-widget.svelte` L24: cleanup function checks `if (scriptElement) return` -- this should be `if (!scriptElement) return`. The cleanup never actually removes the script. If the widget is kept, this bug needs fixing. If the widget is removed, this is moot.

3. **`EnhancedImage` is not actually enhanced.** As noted in 2.2, the component renders a plain `<img>`. The food initiative section L96-105 loops images with `EnhancedImage`. If the section is rebuilt with new images, the same non-optimized `<img>` will be used. Story should decide: fix `EnhancedImage` or accept plain `<img>`.

4. **Image loop pattern.** Current code (L95-101) uses `{#each {length: 6}, index}` with a string template for paths. Story 3.2 replaces the content -- AC must specify how many images, their filenames, and whether the same loop pattern is used or if images are defined in a data file.

### Missing AC

- New body text / copy is not provided.
- If section id changes from `food-access` to `healing-programs`, the `siteLinks` hash must also change (covered by Story 3.3, but this is a hard dependency -- 3.2 and 3.3 must deploy together or the nav link breaks).
- Story says "Optionally rename `food-initiative.svelte` -> `healing-programs.svelte`" -- if renamed, `single-page-application.svelte` L7 import and L21 usage must update. This is a hard coupling.

### Dependency chain

- Story 3.3 (nav update) MUST ship with or before 3.2. If the section id changes but nav still points to `#food-access`, the link breaks.

---

## Story 3.3 -- Update navigation

**Verdict: PASS with notes**

### File impact

- `src/lib/siteData.ts` L67-71: Update `label`, `hash`, `id` for the food-access entry.

### Missing AC

- Exact new values not specified. Should be:
    - `label: 'Healing Programs'` (or similar)
    - `hash: '#healing-programs'`
    - `id: 'healing-programs'`
- `icon: 'donate'` -- does this still apply? Or should it change? AC should specify.

---

## Open Questions -- Recommendations

### Q1: Rename `food-initiative.svelte` -> `healing-programs.svelte`?

**Recommendation: Yes, rename.**

Rationale: The component name should match its content. Leaving it as `food-initiative.svelte` while it renders "Healing Programs" content creates cognitive dissonance for any future developer. The refactor is trivial -- one file rename + one import path update in `single-page-application.svelte` L7.

### Q2: GoFundMe widget -- update embed or direct link only?

**Recommendation: Direct link only. Remove the widget.**

Rationale:

- The widget embeds a third-party script (`gofundme.com/static/js/embed.js`) with no content security policy controls.
- The current widget has a cleanup bug (L24 inverted condition).
- GoFundMe embeds are unreliable on SPAs (script injection timing issues with client-side navigation).
- A simple `<a>` button (like the existing "Donate" button at L76-83) is more reliable, accessible, and faster. The section already has this pattern.
- Remove `src/lib/ui/organisms/go-fund-me-widget.svelte` entirely.

### Q3: `food-baskets.data.ts` -- remove or repurpose?

**Recommendation: Delete it.**

Rationale:

- `donationOptions` is not imported anywhere (grep confirms: only reference is the file itself).
- `handleDonation` is a no-op stub (`console.log`).
- The image paths it references (`/images/donations/food-basket.jpg`, etc.) likely don't even exist.
- Dead code with no consumers. Remove.

---

## Cross-cutting Concerns

### 1. No test framework

Stories do not reference testing, which is correct given no test framework is configured. However, **Story 3.2 is high-risk** (full section replacement + GoFundMe changes + nav coupling). Manual QA checklist should be added as AC:

- Nav link scrolls to correct section
- GoFundMe link opens correct campaign
- All images load (no 404s)
- Mobile layout not broken

### 2. Footer / contactLinks divergence

The footer (`app-footer.svelte`) is fully hardcoded and does not consume `contactLinks`. Stories 1.2 and 1.3 require touching both. This is a maintenance trap. Recommend: add a follow-up story to refactor the footer to iterate `contactLinks` (filtered), eliminating the dual-maintenance problem.

### 3. `EnhancedImage` is a lie

`src/lib/ui/atoms/enhanced-image.svelte` renders `<img>`, not `<enhanced:img>`. The enhanced version is commented out. All stories adding images will serve unoptimized assets. This is pre-existing tech debt but directly impacts Stories 2.1, 2.2, 3.1, 3.2.

### 4. `ComponentType` deprecation

`src/lib/siteData.ts` L7 uses `import type {ComponentType} from 'svelte'`. Svelte 5 deprecates `ComponentType` in favor of `Component`. Not a blocker today but will emit warnings. Low-priority cleanup.

### 5. `events.sort()` mutation

`time-line.svelte` L63 calls `.sort()` on the imported `events` array directly, mutating it in place. This is a latent bug -- if another component imports `events`, they get the mutated order. Should be `[...events].sort(...)`. Not in scope for these stories but flagged.
