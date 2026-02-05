# Architectural Review -- Epics & Stories

**Reviewer:** Winston (Senior System Architect)
**Date:** 2026-02-05
**Scope:** Epic 1 (Social Links), Epic 2 (Timeline -- Colors of Hope), Epic 3 (Food Access -> Healing Programs)

---

## 1. Contraindications

### 1.1 -- Story 1.1 (Remove Linktree): `icon-link.svelte` is the Linktree SVG, not a generic icon

The story says "Clean up icon-link.svelte if unused." This is correct -- `icon-link.svelte` contains the Linktree asterisk SVG specifically. It is only imported in `siteData.ts` for the Linktree entry. However, note that `icon-link.svelte` is poorly named -- it looks generic but is actually a Linktree-specific icon. The file name will not cause confusion after removal, but this is worth calling out in case anyone assumes it is a generic "external link" icon. It is not; the generic external link icon lives inside `iconify.svelte` as the `.external-link` CSS class.

**Action required:** The story must also remove the `.inktree` CSS class from `iconify.svelte` (line 96-108). The story currently only mentions `app.d.ts` cleanup but `iconify.svelte` contains dead CSS if the type is removed. This is not a break, but it is dead code.

### 1.2 -- Story 1.2 (YouTube URL): Two sources of truth

The footer (`app-footer.svelte`) has **hardcoded** social links that duplicate `siteData.ts`. Story 1.2 correctly identifies both locations. However, this is a structural problem: there should be a single source of truth. The footer should import and iterate `contactLinks` from `siteData.ts` instead of hardcoding URLs.

**Contraindication:** If only Story 1.2 is implemented (URL swap) without refactoring the footer to use `contactLinks`, the duplication problem persists. Story 1.3 (Add TikTok) also requires adding TikTok to the footer separately, compounding the debt.

**Recommendation:** Add a Story 1.0 (or modify Story 1.2) to refactor `app-footer.svelte` to consume `contactLinks` from `siteData.ts`. This eliminates the duplication for Stories 1.2 and 1.3, and prevents future drift. The "Follow Us" section of the footer should filter `contactLinks` by a predefined set of social platform keys, similar to how `contact-us.svelte` already does it (lines 39-52).

### 1.3 -- Story 1.3 (Add TikTok): Two icon systems in play

The codebase has **two parallel icon systems**:
1. **SVG component files** in `atoms/` (e.g., `icon-instagram.svelte`, `icon-youtube.svelte`) -- used by `contactLinks` in `siteData.ts` via `ComponentType`
2. **CSS mask-image icons** in `iconify.svelte` (e.g., `.instagram`, `.youtube`, `.inktree`) -- used by `siteLinks` in `siteData.ts` via `App.IconType`

Story 1.3 says "Create icon-tiktok.svelte" (system 1) and "Add 'tiktok' to IconType" (system 2). These are **different concerns**. Adding `'tiktok'` to `IconType` in `app.d.ts` requires a corresponding `.tiktok` CSS class in `iconify.svelte` -- otherwise the icon type is declared but renders nothing. But TikTok is a social link, not a nav link, so it may not be needed in `iconify.svelte` at all unless TikTok gets added to the navbar.

**Recommendation:** Only add `icon-tiktok.svelte` (for `contactLinks`). Only add `'tiktok'` to `IconType` and `iconify.svelte` if TikTok will appear in the sticky navbar. Currently, social links in the navbar are not a pattern this app uses -- nav links point to page sections, not external social platforms. Adding the type without the CSS implementation would be a type-safety violation (the union allows a value that renders nothing).

### 1.4 -- Story 3.2 (Replace Food Access): `EnhancedImage` is not using `<enhanced:img>`

The `enhanced-image.svelte` component has `<enhanced:img>` **commented out** (line 29-33). It falls back to a plain `<img>` tag. This means:
- The `enhancedImages()` Vite plugin is configured but effectively unused
- All images throughout the site are served as unoptimized static files
- Adding new images (Stories 2.1, 3.1) will follow the same pattern -- no srcset, no format negotiation, no responsive sizing

This is not a blocker for the current stories, but it means Story 2.1's instruction to "Convert client PNGs to optimized WebP" is the only optimization layer. There is no build-time image pipeline despite the plugin being present.

### 1.5 -- Story 3.2 (Replace Food Access): GoFundMe widget has a bug in cleanup

In `go-fund-me-widget.svelte` (line 24), the cleanup function has a logic error:
```ts
if (scriptElement) return  // BUG: should be `if (!scriptElement)`
```
This means the injected `<script>` tag is **never cleaned up** on component unmount. If the widget is removed (Story 3.2), this bug becomes moot. But if the widget is kept or updated, the leak persists.

### 1.6 -- Story 3.2: GoFundMe widget points to a DIFFERENT campaign than the section links

The widget URL references `basketsforgaza` while the donate/visit links reference `etaam-food-aid-initiative-feeding-families-in-gaza`. These are two different GoFundMe campaigns. Story 3.2 says "Update GoFundMe link to `https://gofund.me/3799cb423`" -- this needs to update **all three URLs** (widget data-url, donate button href, visit page href), not just one.

### 1.7 -- Story 2.2 (Timeline entry): `events.sort()` mutates the source array

In `time-line.svelte` line 63, the template does `events.sort(...)` directly. `.sort()` mutates the original array in place. Adding a new entry (Story 2.2) will work, but this is a latent bug: if `events` is imported elsewhere or if the component re-renders, the sort order may be unpredictable. This is not introduced by the stories but is worth flagging since Story 2.2 touches this data.

---

## 2. Missing Stories / Acceptance Criteria

### 2.1 -- Missing: Refactor footer to use `contactLinks` (pre-requisite to Stories 1.2, 1.3)

As described in Contraindication 1.2. Without this, every social link change requires edits in two places.

**Suggested story:**
> **Story 1.0 -- Refactor footer to consume contactLinks from siteData.ts**
> - Import `contactLinks` in `app-footer.svelte`
> - Replace hardcoded "Follow Us" links with iteration over `contactLinks` (filtering for social platforms)
> - Remove hardcoded URLs
> - Acceptance: Footer renders identically; URLs come from single source of truth

### 2.2 -- Missing: Story 1.1 acceptance criteria -- clean up `iconify.svelte`

The `.inktree` CSS class in `iconify.svelte` (lines 96-108) must be removed alongside the `IconType` union member. Add this to acceptance criteria.

### 2.3 -- Missing: Story 1.3 acceptance criteria -- clarify `IconType` scope

Add acceptance criterion: "Only add `'tiktok'` to `IconType` union and `iconify.svelte` CSS if TikTok will be used in the navbar. If TikTok is social-links-only, `icon-tiktok.svelte` and its `contactLinks` entry are sufficient."

### 2.4 -- Missing: Story 3.2 acceptance criteria -- old food access images

Story 3.2 replaces the section content but does not address the 6 existing images in `static/images/food_access_initiative/`. Add acceptance criteria:
- Decide: archive or delete `static/images/food_access_initiative/` directory
- If deleted, verify no other component references these paths

### 2.5 -- Missing: Story 3.3 acceptance criteria -- `siteLinks` icon update

The `siteLinks` entry for "Food Access" uses `icon: 'donate'`. If the section becomes "Healing Programs," the `donate` icon may no longer be semantically appropriate. The story should explicitly decide whether to keep or change the icon, and if changed, whether a new icon class is needed in `iconify.svelte`.

### 2.6 -- Missing: Story 3.2 acceptance criteria -- section content source

The current `food-initiative.svelte` has all its text content hardcoded in the template. If "Healing Programs" content is similarly static, that is fine. But the story should specify: where does the new body text come from? Is it provided by the client? This is a content dependency, not a code dependency, but it blocks implementation.

### 2.7 -- Missing: Verify `contact-us.svelte` after Linktree removal

`contact-us.svelte` iterates over `Object.entries(contactLinks)` filtering out `Email` and `Shop`. After removing Linktree, the remaining items are YouTube, Instagram, Facebook (and TikTok if added). This should render correctly, but add a visual verification acceptance criterion to Story 1.1 to confirm the "Follow us" grid layout still looks right with one fewer item (or the same count if TikTok is added simultaneously).

---

## 3. Risks

### 3.1 -- Performance: Unoptimized images on Vercel

The `<enhanced:img>` tag is disabled. All images are served as static files from `/static/`. For Stories 2.1 and 3.1 which add new WebP images, this is acceptable short-term. But the timeline section already has 50+ images loading (many at 60x60 thumbnails, but full-resolution files). Without responsive image srcsets or lazy loading at the thumbnail level, this could degrade LCP/FCP on slow connections.

**Risk level:** Low for current scope. Medium if the site grows.
**Mitigation:** Stories 2.1 and 3.1 already specify WebP format, which is good. Ensure images are size-optimized before committing to static. Consider re-enabling `<enhanced:img>` in a future epic.

### 3.2 -- Deployment: GoFundMe embed script injection

The GoFundMe widget dynamically injects a third-party script (`gofundme.com/static/js/embed.js`). This has several risks:
- **CSP (Content Security Policy):** If Vercel headers restrict script-src, the embed will fail silently
- **Performance:** Third-party script blocks rendering in the food/healing section
- **Reliability:** If GoFundMe changes their embed API, the widget breaks with no build-time warning
- **The cleanup bug** (Contraindication 1.5): The script is never removed, so navigating away and back could inject it twice

**Risk level:** Medium.
**Mitigation:** See recommendation on Open Question 2 below.

### 3.3 -- Compatibility: `ComponentType` import from Svelte

`siteData.ts` imports `ComponentType` from `'svelte'`. In Svelte 5, `ComponentType` is deprecated in favor of the `Component` type. This works currently but may trigger warnings or break in future Svelte 5.x releases. Not caused by these stories, but worth noting since Story 1.3 adds a new component to this pattern.

**Risk level:** Low (deprecation, not removal yet).
**Mitigation:** Consider migrating to `Component` type in a tech-debt story.

### 3.4 -- Risk: URL typo in Story 3.2

The GoFundMe URL `https://gofund.me/3799cb423` appears to have a trailing `3` -- typical gofund.me short URLs are 8 hex characters. Verify this URL resolves correctly before implementation.

---

## 4. Recommendations on Open Questions

### Open Question 1: Rename `food-initiative.svelte` to `healing-programs.svelte`?

**Recommendation: Yes, rename.**

Rationale:
- The component will contain entirely different content (different title, body, images, links)
- The filename `food-initiative.svelte` will be actively misleading for future maintainers
- The rename affects exactly 2 files: the component itself and its import in `single-page-application.svelte` (line 7, 21)
- SvelteKit has no file-based routing dependency on section component names (this is not a route file)
- Git will track the rename cleanly if done as a single commit

Impact: Minimal. Two import paths change. No routing implications. No external references.

### Open Question 2: GoFundMe widget -- update embed or use direct link only?

**Recommendation: Remove the embed widget. Use direct link only.**

Rationale:
1. The current widget has a **bug** (script never cleaned up on unmount)
2. It injects a **third-party script** with no CSP compatibility guarantee
3. The widget URL (`basketsforgaza`) is already pointing to a **stale campaign** -- different from the section's own donate links
4. GoFundMe embed scripts are **notoriously flaky** -- they depend on GoFundMe's embed.js being stable, which is not guaranteed
5. A direct link (CTA button) is more reliable, more accessible, and lighter weight
6. The mobile layout already renders the widget poorly (it sits in a `flex-grow-0` div that gets pushed below the content)

Implementation: Remove the `GoFundMeWidget` component import and usage from the healing-programs section. Keep two CTA buttons: "Donate" (direct to GoFundMe donate page) and "Learn More" (to the campaign page). Delete `go-fund-me-widget.svelte` from `organisms/`.

### Open Question 3: `food-baskets.data.ts` -- remove or repurpose?

**Recommendation: Delete it.**

Rationale:
1. It is **imported by zero components** (confirmed via grep -- no file imports `donationOptions` or `handleDonation`)
2. Its `handleDonation` function is a **stub** (`console.log` only) -- never implemented
3. Its `image` paths reference `/images/donations/food-basket.jpg`, `/images/donations/dance-education.jpg`, `/images/donations/community.jpg` -- **none of these directories/files exist** in `static/images/`
4. It references the old food access concept with generic donation tiers
5. The data structure (amount-based tiers) does not map to the healing programs concept

This file is dead code with references to nonexistent assets. Delete it to avoid confusion.

---

## 5. Summary of Recommended Changes to Stories

| # | Story | Change |
|---|-------|--------|
| 1 | New Story 1.0 | Refactor `app-footer.svelte` to import and render from `contactLinks` |
| 2 | Story 1.1 | Add AC: remove `.inktree` CSS class from `iconify.svelte` |
| 3 | Story 1.1 | Add AC: verify `contact-us.svelte` layout with one fewer social link |
| 4 | Story 1.3 | Clarify: only add `'tiktok'` to `IconType` + `iconify.svelte` if needed in navbar |
| 5 | Story 3.2 | Add AC: update ALL GoFundMe URLs (3 locations), or remove widget entirely |
| 6 | Story 3.2 | Add AC: decide fate of `static/images/food_access_initiative/` directory |
| 7 | Story 3.2 | Add AC: specify source of new body text content |
| 8 | Story 3.2 | Verify GoFundMe short URL `3799cb423` resolves correctly |
| 9 | Story 3.3 | Add AC: decide whether `icon: 'donate'` is still appropriate or needs changing |
| 10 | New Story | Delete `food-baskets.data.ts` (dead code, references nonexistent assets) |
| 11 | New Story | Delete `go-fund-me-widget.svelte` (if embed is dropped per recommendation) |

---

## 6. Execution Order Recommendation

The stories have implicit dependencies. Recommended execution order:

1. **Story 1.0** (new) -- Refactor footer to use `contactLinks` -- unblocks 1.2 and 1.3
2. **Story 1.1** -- Remove Linktree
3. **Story 1.3** -- Add TikTok (can run in parallel with 1.1 if no merge conflicts)
4. **Story 1.2** -- Update YouTube URL (trivial after 1.0, single source of truth)
5. **Story 2.1** -- Add Colors of Hope images (no code dependencies)
6. **Story 2.2** -- Add timeline entry (depends on 2.1 for image paths)
7. **Story 3.1** -- Add healing programs hero image (no code dependencies)
8. **Story 3.2** -- Replace food section (depends on 3.1; largest story, may need splitting)
9. **Story 3.3** -- Update navigation (depends on 3.2 for final section id)
10. **Cleanup** -- Delete `food-baskets.data.ts`, delete `go-fund-me-widget.svelte` if applicable
