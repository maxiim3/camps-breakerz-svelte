# Epics & Stories — Client Content Update (Feb 2026)

## Context

Client request to update the Camps Breakerz website: refresh social links, add a new timeline entry for "Colors of Hope" (2024), and replace the Food Access section with a new "Support Healing Through Art" donation campaign.

## Status: COMPLETED

All stories implemented, reviewed, and committed (Feb 2026).

### Review History

- Analyst (Mary): authored
- Architect (Winston): reviewed — 7 contraindications, 7 additions
- Developer (Amelia): reviewed — implementation blockers flagged
- UX Designer (Sally): reviewed — navigation, emotional journey, accessibility concerns
- All open questions resolved (see Decisions section)

---

## Decisions (Resolved)

| Decision                         | Resolution                                                                  | Rationale                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Rename `food-initiative.svelte`? | **Yes** → `healing-programs.svelte`                                         | Unanimous. 2-file impact, prevents confusion.                                                                                   |
| GoFundMe widget?                 | **Remove entirely.** Use direct CTA button to `https://gofund.me/3799cb423` | Embed is buggy (inverted cleanup condition), points to stale campaign (`basketsforgaza`), injects third-party scripts.          |
| `food-baskets.data.ts`?          | **Delete.**                                                                 | Dead code — zero consumers, no client request to preserve.                                                                      |
| Nav label?                       | **"Donate"** instead of "Healing Programs"                                  | UX review: "Healing Programs" is too vague and doesn't signal donation intent. "Donate" is clear. Keep `icon: 'donate'`.        |
| Footer refactor?                 | **Yes** — new prerequisite Story 1.0                                        | All 3 reviewers flagged hardcoded footer links as dual-maintenance trap. Refactor once, then all social link stories just work. |

---

## Epic 1: Social Links Update

**Goal:** Clean up social links — refactor footer, remove Linktree, update YouTube, add TikTok.

### Story 1.0 — Refactor footer to use contactLinks data (PRE-REQUISITE)

**As a** developer, **I want** the footer to consume `contactLinks` from `siteData.ts` **so that** social link changes only need to happen in one place.

**Acceptance Criteria:**

- [x] Refactor `src/lib/ui/organisms/app-footer.svelte` to import and iterate over `contactLinks` instead of hardcoding social links
- [x] Filter to show only social platforms (exclude Email, Shop) — same logic as `contact-us.svelte`
- [x] Preserve existing footer layout, styling, and `hover:text-lime-300` behavior
- [x] All current social links (YouTube, Instagram, Facebook, Linktree) still render correctly after refactor

**Files:**

- `src/lib/ui/organisms/app-footer.svelte`

**Size:** S
**Blocks:** Stories 1.1, 1.2, 1.3

---

### Story 1.1 — Remove Linktree from social links

**As a** visitor, **I want** to see only active, relevant social links **so that** I'm directed to current platforms.

**Acceptance Criteria:**

- [x] Remove `Linktree` entry from `contactLinks` in `src/lib/siteData.ts`
- [x] Remove `IconLink` import from `src/lib/siteData.ts`
- [x] Linktree no longer appears in "Follow us" section or footer
- [x] Delete `src/lib/ui/atoms/icon-link.svelte` (verify no other references first)
- [x] Remove `'inktree'` from `IconType` union in `src/app.d.ts`
- [x] Check `src/lib/ui/molecules/iconify.svelte` for any `.inktree` / linktree CSS rules — remove if present

**Files:**

- `src/lib/siteData.ts`
- `src/app.d.ts`
- `src/lib/ui/atoms/icon-link.svelte` (delete)
- `src/lib/ui/molecules/iconify.svelte` (cleanup if needed)

**Size:** XS
**Blocked by:** Story 1.0

---

### Story 1.2 — Update YouTube URL

**As a** visitor, **I want** to be directed to the correct YouTube channel **so that** I find Camps Breakerz content.

**Acceptance Criteria:**

- [x] Update YouTube URL from `https://www.youtube.com/@gazabboy` to `https://www.youtube.com/@campsbreakerz` in `src/lib/siteData.ts`
- [x] Verify footer now picks up the change automatically (thanks to Story 1.0 refactor)

**Files:**

- `src/lib/siteData.ts`

**Size:** XS
**Blocked by:** Story 1.0

---

### Story 1.3 — Add TikTok to social links

**As a** visitor, **I want** to find Camps Breakerz on TikTok **so that** I can follow them on that platform.

**Acceptance Criteria:**

- [x] Create `src/lib/ui/atoms/icon-tiktok.svelte` — TikTok SVG icon matching existing icon style (consistent size, stroke, viewBox)
- [x] Add `'tiktok'` to `IconType` union in `src/app.d.ts`
- [x] Add `TikTok` entry to `contactLinks` in `src/lib/siteData.ts` with URL `https://www.tiktok.com/@campsbreakerz` and `component: IconTiktok`
- [x] Position TikTok in `contactLinks` object after Instagram (desired display order: Instagram, TikTok, YouTube, Facebook)
- [x] TikTok appears in both "Follow us" section and footer automatically
- [x] If `iconify.svelte` has a CSS icon system, add corresponding `.tiktok` rule

**Files:**

- `src/lib/ui/atoms/icon-tiktok.svelte` (new)
- `src/app.d.ts`
- `src/lib/siteData.ts`
- `src/lib/ui/molecules/iconify.svelte` (if CSS icon system needs update)

**Size:** S
**Blocked by:** Story 1.0

---

## Epic 2: Timeline — Colors of Hope (2024)

**Goal:** Add a new "Colors of Hope" program entry to the timeline/history section.

### Story 2.1 — Add Colors of Hope images to static assets

**As a** developer, **I want** the Colors of Hope photos optimized and stored in the static directory **so that** they can be referenced in the timeline.

**Acceptance Criteria:**

- [x] Create directory `static/images/colors_of_hope/`
- [x] Convert `client-request/01.png` through `05.png` to optimized WebP format
- [x] Name files consistently: `colors_of_hope_01.webp` through `colors_of_hope_05.webp`
- [x] Verify reasonable file sizes (target < 200KB each)

**Files:**

- `static/images/colors_of_hope/` (new directory + 5 images)

**Size:** S

---

### Story 2.2 — Add Colors of Hope entry to timeline data

**As a** visitor, **I want** to see the "Colors of Hope" program in the history/achievements section **so that** I learn about CB Crew's art therapy work.

**Acceptance Criteria:**

- [x] Add new `Node` entry to `events` array in `src/lib/about-us.data.ts`
    - `status`: "Colors of Hope"
    - `dateStart`: 2024
    - `description`: "A community program established to provide therapy through drawing, crafting, and graffiti."
    - `images`: array of 5 `Img` objects with paths to `colors_of_hope/` WebP files
- [x] Each image has a **descriptive alt text** (not generic "Image 1") — describe what's shown (e.g., "Girl proudly holding her cartoon drawing in the Colors of Hope workshop")
- [x] Entry appears correctly in the timeline with images
- [x] Image lightbox modal works for new images
- [x] Entry positioned chronologically (after 2023 entries)

**Files:**

- `src/lib/about-us.data.ts`

**Size:** S
**Blocked by:** Story 2.1

---

## Epic 3: Replace Food Access with Donate / Healing Programs

**Goal:** Replace the entire Food Access section with the new "Support Healing Through Art" donation campaign.

### Story 3.1 — Add Healing Programs hero image to static assets

**As a** developer, **I want** the new donation hero image stored in static assets **so that** it can be displayed in the section.

**Acceptance Criteria:**

- [x] Create directory `static/images/healing_programs/`
- [x] Convert `client-request/06.png` (collage) to optimized WebP
- [x] Store as `static/images/healing_programs/healing_programs_hero.webp`
- [x] Verify reasonable file size

**Files:**

- `static/images/healing_programs/` (new directory + 1 image)

**Size:** XS

---

### Story 3.2 — Replace Food Access section with Healing Programs

**As a** visitor, **I want** to see the current "Support Healing Through Art" campaign **so that** I can learn about and support the art therapy programs.

**Acceptance Criteria:**

- [x] Rename `src/lib/ui/sections/food-initiative.svelte` → `src/lib/ui/sections/healing-programs.svelte`
- [x] Update import in `src/lib/ui/pages/single-page-application.svelte` accordingly
- [x] Update section `id` from `food-access` to `healing-programs`
- [x] Replace section title: "Support Healing Through Art"
- [x] Place hero image (collage) **above** body text for emotional impact
- [x] Replace all body text with the 4 client-provided paragraphs:
    1. "Currently, our focus is on empowering our students..."
    2. "With adequate funding, we can strengthen..."
    3. "Our committed team, equipped with backgrounds..."
    4. "Thank you for your empathy..."
- [x] Replace the 6-image food gallery with the single hero collage image
- [x] Update donate button link to `https://gofund.me/3799cb423`
- [x] **Remove** the GoFundMe embed widget entirely — delete `src/lib/ui/organisms/go-fund-me-widget.svelte`
- [x] Remove GoFundMe widget import from healing-programs component
- [x] Add a prominent CTA button for the donation link (not buried in text)
- [x] **Delete** `src/lib/food-baskets.data.ts` (dead code, zero consumers)
- [x] **Delete** or archive `static/images/food_access_initiative/` directory (old images no longer used)

**Files:**

- `src/lib/ui/sections/food-initiative.svelte` → `healing-programs.svelte` (rename + rewrite)
- `src/lib/ui/pages/single-page-application.svelte` (update import)
- `src/lib/ui/organisms/go-fund-me-widget.svelte` (delete)
- `src/lib/food-baskets.data.ts` (delete)
- `static/images/food_access_initiative/` (delete)

**Size:** M
**Blocked by:** Story 3.1

---

### Story 3.3 — Update navigation label and anchor

**As a** visitor, **I want** the navigation to clearly indicate where to donate **so that** I can find the donation section easily.

**Acceptance Criteria:**

- [x] Update nav entry in `src/lib/siteData.ts`:
    - `label`: "Food Access" → "Donate"
    - `hash`: `#food-access` → `#healing-programs`
    - `id`: `food-access` → `healing-programs`
    - `icon`: keep `'donate'`
- [x] Navigation link scrolls correctly to the renamed section

**Files:**

- `src/lib/siteData.ts`

**Size:** XS
**Blocked by:** Story 3.2

---

## Implementation Order

```
Story 1.0 (Footer refactor) ─┬─→ Story 1.1 (Remove Linktree)
                              ├─→ Story 1.2 (Update YouTube)
                              └─→ Story 1.3 (Add TikTok)

Story 2.1 (Images) ──────────→ Story 2.2 (Timeline entry)

Story 3.1 (Hero image) ──────→ Story 3.2 (Section rewrite) ──→ Story 3.3 (Nav update)
```

**Parallel tracks:**

- Epic 1 (after 1.0), Epic 2, and Story 3.1 can all start in parallel
- Story 3.2 is the critical path (largest piece of work)

---

## Noted Technical Debt (Out of Scope)

Issues discovered during review, not part of this client request:

- `<enhanced:img>` is commented out in `enhanced-image.svelte` — images ship unoptimized
- `events.sort()` in `time-line.svelte` mutates the source array in place
- ~~`ComponentType` import is deprecated in Svelte 5~~ — **Fixed** (changed to `Component`)
- Timeline image buttons have `aria-labelledby="open image"` bug (same label for all)
- Lightbox modal lacks focus trapping
