# Epics & Stories — Client Content Update (Feb 2026)

## Context
Client request to update the Camps Breakerz website: refresh social links, add a new timeline entry for "Colors of Hope" (2024), and replace the Food Access section with a new "Healing Programs" donation campaign.

---

## Epic 1: Social Links Update
**Goal:** Clean up social links — remove Linktree, update YouTube, add TikTok.

### Story 1.1 — Remove Linktree from social links
**As a** visitor, **I want** to see only active, relevant social links **so that** I'm directed to current platforms.

**Acceptance Criteria:**
- [ ] Remove `Linktree` entry from `contactLinks` in `src/lib/siteData.ts` (line 40-44)
- [ ] Linktree no longer appears in the "Follow us" section (`src/lib/ui/sections/contact-us.svelte`)
- [ ] Optionally clean up `icon-link.svelte` if it becomes unused (verify no other references)
- [ ] Remove `'inktree'` from `IconType` in `src/app.d.ts` if unused

**Files:**
- `src/lib/siteData.ts`
- `src/app.d.ts` (cleanup)
- `src/lib/ui/atoms/icon-link.svelte` (potential removal)

**Size:** XS

---

### Story 1.2 — Update YouTube URL
**As a** visitor, **I want** to be directed to the correct YouTube channel **so that** I find Camps Breakerz content.

**Acceptance Criteria:**
- [ ] Update YouTube URL from `https://www.youtube.com/@gazabboy` to `https://www.youtube.com/@campsbreakerz` in `src/lib/siteData.ts` (line 21)
- [ ] Update hardcoded YouTube URL in `src/lib/ui/organisms/app-footer.svelte` (line 22)

**Files:**
- `src/lib/siteData.ts`
- `src/lib/ui/organisms/app-footer.svelte`

**Size:** XS

---

### Story 1.3 — Add TikTok to social links
**As a** visitor, **I want** to find Camps Breakerz on TikTok **so that** I can follow them on that platform.

**Acceptance Criteria:**
- [ ] Create `icon-tiktok.svelte` component in `src/lib/ui/atoms/` (TikTok SVG icon)
- [ ] Add `'tiktok'` to `IconType` union in `src/app.d.ts`
- [ ] Add `TikTok` entry to `contactLinks` in `src/lib/siteData.ts` with URL `https://www.tiktok.com/@campsbreakerz`
- [ ] TikTok appears in the "Follow us" section alongside other social platforms
- [ ] Add TikTok link to footer in `src/lib/ui/organisms/app-footer.svelte`

**Files:**
- `src/lib/ui/atoms/icon-tiktok.svelte` (new)
- `src/app.d.ts`
- `src/lib/siteData.ts`
- `src/lib/ui/organisms/app-footer.svelte`

**Size:** S

---

## Epic 2: Timeline — Colors of Hope (2024)
**Goal:** Add a new "Colors of Hope" program entry to the timeline/history section.

### Story 2.1 — Add Colors of Hope images to static assets
**As a** developer, **I want** the Colors of Hope photos optimized and stored in the static directory **so that** they can be referenced in the timeline.

**Acceptance Criteria:**
- [ ] Create directory `static/images/colors_of_hope/`
- [ ] Copy and convert `client-request/01.png` through `05.png` to optimized WebP format
- [ ] Name files consistently: `colors_of_hope_01.webp` through `colors_of_hope_05.webp`

**Files:**
- `static/images/colors_of_hope/` (new directory + 5 images)

**Size:** S

---

### Story 2.2 — Add Colors of Hope entry to timeline data
**As a** visitor, **I want** to see the "Colors of Hope" program in the history/achievements section **so that** I learn about CB Crew's art therapy work.

**Acceptance Criteria:**
- [ ] Add new `Node` entry to `events` array in `src/lib/about-us.data.ts`
  - `status`: "Colors of Hope"
  - `dateStart`: 2024
  - `description`: "A community program established to provide therapy through drawing, crafting, and graffiti."
  - `images`: reference the 5 images from `static/images/colors_of_hope/`
- [ ] Entry appears correctly in the timeline with images
- [ ] Image modal (lightbox) works for new images

**Files:**
- `src/lib/about-us.data.ts`

**Size:** S

---

## Epic 3: Replace Food Access with Healing Programs
**Goal:** Replace the entire Food Access donation section with the new "Healing Programs" / "Support Healing through Art" campaign.

### Story 3.1 — Add Healing Programs hero image to static assets
**As a** developer, **I want** the new donation hero image stored in static assets **so that** it can be displayed in the section.

**Acceptance Criteria:**
- [ ] Convert `client-request/06.png` (collage) to optimized WebP
- [ ] Store as `static/images/healing_programs/healing_programs_hero.webp`

**Files:**
- `static/images/healing_programs/` (new directory + 1 image)

**Size:** XS

---

### Story 3.2 — Replace Food Access section content with Healing Programs
**As a** visitor, **I want** to see the current "Healing Programs" campaign **so that** I can learn about and support the art therapy programs.

**Acceptance Criteria:**
- [ ] Update section `id` from `food-access` to `healing-programs` in `src/lib/ui/sections/food-initiative.svelte`
- [ ] Replace section title from "Food Access Initiative" to "Support Healing Through Art"
- [ ] Replace all body text with the new copy provided by client (4 paragraphs about empowering students, specialized programs, committed team, and thank you)
- [ ] Replace image gallery: remove the 6 food images loop, display `06.png` (collage) as section hero image
- [ ] Update GoFundMe donate link to `https://gofund.me/3799cb423`
- [ ] Update or remove the GoFundMe embed widget if old campaign embed no longer applies
- [ ] Optionally rename component file from `food-initiative.svelte` to `healing-programs.svelte` (update imports in `single-page-application.svelte`)

**Files:**
- `src/lib/ui/sections/food-initiative.svelte` (major rewrite)
- `src/lib/ui/organisms/go-fund-me-widget.svelte` (update or remove)
- `src/lib/ui/pages/single-page-application.svelte` (update import if renamed)

**Size:** M

---

### Story 3.3 — Update navigation label and anchor
**As a** visitor, **I want** the navigation to reflect the new section name **so that** I can find the donation section.

**Acceptance Criteria:**
- [ ] Update nav entry in `src/lib/siteData.ts`:
  - `label`: "Food Access" → "Healing Programs"
  - `hash`: `#food-access` → `#healing-programs`
  - `id`: `food-access` → `healing-programs`
- [ ] Navigation link scrolls correctly to the renamed section

**Files:**
- `src/lib/siteData.ts`

**Size:** XS

---

## Implementation Order (Suggested)

1. **Epic 1** (Social Links) — independent, quick wins
   - Story 1.1 → 1.2 → 1.3
2. **Epic 2** (Timeline) — independent of others
   - Story 2.1 → 2.2
3. **Epic 3** (Healing Programs) — largest scope
   - Story 3.1 → 3.2 → 3.3

**Epics 1 and 2 can be done in parallel. Epic 3 is the critical path.**

---

## Open Questions

1. **Component rename?** Should `food-initiative.svelte` be renamed to `healing-programs.svelte` for code clarity, or keep the old filename to minimize diff? → **Recommendation: rename** for long-term maintainability.
2. **GoFundMe widget:** The old embed widget (`go-fund-me-widget.svelte`) references a different campaign. Should we update the embed URL to the new campaign, or remove the embedded widget and just use the direct donate link? → **Need client input or test if new link works as embed.**
3. **`food-baskets.data.ts`:** This data file (donation tiers) is not visibly used in the current food-initiative section rendering. Confirm if it should be removed or repurposed for healing program tiers.
