# UX Review: Camps Breakerz Website Update

**Reviewer:** Sally, Senior UX Designer
**Date:** 2026-02-05
**Scope:** Epics 1-3 (Social Links, Timeline, Food-to-Healing Section Replacement)

---

## 1. Navigation & Labeling (Epic 3, Story 3.3)

### The "Healing Programs" Label Problem

The proposed nav label change from "Food Access" to "Healing Programs" concerns me. Looking at the actual section, the title is "Support Healing Through Art" but the nav label would be "Healing Programs." These say different things. One is a call to action. The other is a category label.

More importantly, from a **first-time visitor's perspective**, "Healing Programs" is vague. Someone arriving at the site does not yet know what CB Crew does therapeutically. The label needs to serve two functions simultaneously:

1. Tell the visitor what this section is about
2. Signal that this is where they can **give money**

The current "Food Access" label does both: you know it's about food, and the word "access" implies people need help getting it. "Healing Programs" does neither clearly.

**Recommendation:** Consider "Support Us" or "Donate" as the nav label. It is the primary conversion section and should be labeled for what the visitor can **do**, not what the organization **calls** it internally. If the client insists on something program-specific, "Support Healing" is slightly better than "Healing Programs" because it includes the verb.

### Nav Icon Mismatch

Currently `siteData.ts` assigns `icon: 'donate'` to the Food Access link. This icon choice is correct for a donation-focused section regardless of the rebrand. Confirm this icon is preserved when the label changes. If the icon changes to something generic like `'information'`, the donation intent of the section becomes invisible on mobile (where labels are hidden via `hidden md:inline`).

**Critical:** On mobile, the navbar only shows icons, not text labels (`<span class="hidden md:inline">`). The current nav relies entirely on icon recognition on small screens. The `donate` icon must remain to signal "this is where you give."

### Hash/ID Update

The hash changes from `#food-access` to presumably `#healing-programs`. Any existing bookmarks or shared links containing `#food-access` will break silently (the page will load but not scroll to the section). This is a minor but real concern for a charity site where people may have shared direct links to the donation section.

**Recommendation:** Add a one-line scroll redirect or at minimum document this as a known breaking change. For a charity site, every broken donation link is lost revenue.

---

## 2. Donation Flow & Conversion (Epic 3, Story 3.2)

### GoFundMe Embed vs. Direct Link

This is the most consequential UX decision in the entire update.

**Current state:** The section has a two-column layout. Left side: prose text + "Donate" button + "Visit the GoFundMe page" link + image gallery. Right side: GoFundMe embedded widget (loaded via external script injection in `go-fund-me-widget.svelte`).

**What the embed provides that a link does not:**
- Progress bar showing how much has been raised (social proof)
- Donor count (social proof)
- Recent donations (social proof + urgency)
- Donate button embedded in the widget itself (reduced friction)
- The visitor never leaves the page to see campaign details

**What the embed costs:**
- External script injection (performance hit, potential CSP issues)
- Layout instability as the embed loads asynchronously
- The widget URL currently points to `basketsforgaza` while the donate button points to `etaam-food-aid-initiative` -- these are **different campaigns**. This is already a problem in the current site.
- The embed is not styled to match the site's dark theme
- On mobile, the embed likely stacks below the text, pushing it far down

**My recommendation:** Replace the embed with a well-designed **in-page donation summary** (amount raised, donor count) if the GoFundMe API allows fetching this data, paired with a prominent CTA button that links out. If API integration is not feasible, drop the embed and use a **single, prominent CTA button** with strong visual hierarchy (the existing `btn-warning` style works well here as it uses the warm gold/yellow that contrasts against the dark theme). The current dual-button pattern ("Donate" + "Visit the GoFundMe page") is confusing -- which one should I click?

**However:** If the decision is made to remove the embed entirely, the section loses all social proof. The stories should explicitly account for this. Consider adding a static line like "Join 500+ donors who have contributed to our programs" or similar, manually updated periodically.

### Donation Tiers (Open Question 3)

The existing `food-baskets.data.ts` defines three tiers ($20, $50, $100) that are **not currently rendered anywhere in the food-initiative section**. The `handleDonation` function just logs to console -- it was never wired up. This is dead code.

**Recommendation:** Either repurpose these tiers for the healing programs section (they provide useful price anchoring: "$20 provides art supplies for one child", "$50 funds a week of therapy sessions", "$100 sponsors a month of programs") or remove them entirely. Do not leave dead data files in the codebase. If repurposed, the amounts and descriptions need to be rewritten to match the new campaign messaging.

Price-anchored donation tiers are a **proven conversion pattern** for charity sites. I recommend repurposing this, not removing it.

---

## 3. Image Presentation (Epic 2 + Epic 3)

### Colors of Hope -- 5 Photos in Timeline (Story 2.2)

The existing timeline entries display images as small 60x60 thumbnails that open in a lightbox modal on click. This pattern works well for documentation-style photos (the founder portraits, the academy classes). Five images of girls with their drawings fits this pattern.

**Concerns:**
- The existing thumbnail buttons use `aria-labelledby="open image"` which is incorrect (`aria-labelledby` should reference an element ID, not contain label text). This is a pre-existing accessibility bug, but adding 5 more images amplifies it. Should be `aria-label="Open full image: [alt text]"`.
- The alt text for the new images should be descriptive and specific: "Girl displaying her drawing of [subject]" rather than generic "Colors of Hope Program - Image 1". These are **children's art** -- the alt text should convey what makes each image distinct. This matters both for accessibility and for SEO.
- Five thumbnails at 60x60 will display as a row of tiny squares. On mobile within a `timeline-box` with `max-w-xl`, they may wrap awkwardly. The existing entries with 7+ images (Emergency Response Team, CB Academy) already face this. Verify the wrapping behavior works acceptably with 5 images.

### Collage Hero Image (Story 3.1)

The collage replaces the image gallery that currently exists in the food section (6 images in a 3-column flex grid). A single hero image is a different visual pattern.

**Recommendations:**
- The collage should be **full-width or near-full-width** within the content column, not constrained to a small area. A collage by definition has multiple subjects compressed into one image; at small sizes it becomes noise.
- Provide responsive image sizes. A collage with fine details will degrade on mobile if served at desktop resolution and downscaled.
- The collage should be placed **above the body text**, not below it. The current food section puts text first and images last, which buries the emotional impact. For a "Support Healing Through Art" section, the visual should lead. Show children creating art, then explain, then ask for money.
- Alt text for the collage should describe the composite: "Collage of children participating in art therapy activities including drawing, crafting, and graffiti" rather than just "Healing programs collage."

### Losing the 6 Food Access Images

The current section displays 6 food access images. These will be removed entirely. No story accounts for archiving or redirecting this content. If these images document real aid work, consider whether they should remain accessible somewhere (perhaps in the timeline, as a "Food Aid Initiative" entry for 2023-2024). Removing evidence of past work without acknowledgment feels like erasure to returning visitors.

---

## 4. Social Links (Epic 1)

### TikTok Placement and Icon (Story 1.3)

**Icon consistency:** All current social icons are custom SVG Svelte components (`icon-instagram.svelte`, `icon-facebook.svelte`, etc.). The TikTok icon must be built the same way. Do not use an icon library for just TikTok while everything else is hand-crafted SVG.

**Ordering in `contactLinks`:** The current order is Email, YouTube, Instagram, Facebook, Linktree, Shop. The "Follow Us" section in `contact-us.svelte` filters out Email and Shop, rendering: YouTube, Instagram, Facebook, Linktree. After changes: YouTube, Instagram, Facebook, TikTok.

**Recommended order:** Instagram, TikTok, YouTube, Facebook. Rationale:
- Instagram is CB Crew's most active and relevant platform (referenced directly in the food section text as `@campsbreakerz`)
- TikTok should be adjacent to Instagram as they share a similar content format (short video)
- YouTube for longer-form content
- Facebook last (lower engagement for this demographic)

This ordering matters because the contact section renders these in a horizontal row. Visual grouping by content format (short video platforms together, then long-form) makes cognitive sense.

### Footer Inconsistency

The footer (`app-footer.svelte`) **hardcodes** social links separately from `siteData.ts`. It currently has Instagram, Facebook, YouTube as plain `<a>` tags. Story 1.3 only mentions updating the "Follow Us" section and footer, but the implementation needs to update **both** `siteData.ts` (for the contact section) **and** the footer component. The stories should explicitly call out both locations. Same for Stories 1.1 (Linktree removal) and 1.2 (YouTube URL update).

The footer also has the old YouTube URL hardcoded (`@gazabboy`). The YouTube URL update (Story 1.2) must be applied in both `siteData.ts` AND `app-footer.svelte`.

**Recommendation:** The footer should consume `contactLinks` from `siteData.ts` instead of hardcoding URLs. This is a refactoring opportunity that prevents future drift. Flag this as a tech debt item if it is out of scope for this sprint.

### Linktree Removal (Story 1.1)

Linktree is currently the only "aggregator" link. Removing it is fine if all individual platforms are linked directly (which they are). No UX concern here -- one less click for the user.

---

## 5. Emotional Journey & Section Transition

### The Narrative Arc Problem

The current page flow is: Landing (video) -> Timeline (history) -> Food Access (donate) -> Contact -> Shop.

After the update: Landing -> Timeline (with Colors of Hope added) -> Healing Programs (donate) -> Contact -> Shop.

The transition from **food aid** to **art therapy** is a significant narrative shift. A visitor who previously donated to feed families will arrive at a page now asking them to fund art supplies. This is not inherently wrong -- art therapy is legitimate and needed -- but the **absence of acknowledgment** is a problem.

**What's missing:** There is no transition language. The food aid campaign presumably succeeded or evolved. The new section should briefly acknowledge: "Building on our food aid work, CB Crew has expanded into..." or similar. The 4 new paragraphs (empowering students, somatic release, committed team, call to action) describe the new program but do not bridge from the old one.

**Risk:** Returning donors who gave specifically for food may feel their contribution was abandoned. A single sentence connecting past food aid to current healing work solves this.

### Tone Calibration

The proposed section title "Support Healing Through Art" is well-calibrated. It centers the visitor's action ("support"), names the outcome ("healing"), and names the method ("art"). This is good.

The body text mentions "somatic release" and "coping skills." These are clinical terms. For a general audience, especially one emotionally motivated to help children in Gaza, softer language may convert better. "Helping children process trauma through movement and creativity" says the same thing without requiring the visitor to know what "somatic release" means.

However, looking at the existing Emergency Response Team entry in the timeline, this exact clinical language is already used: "specialized programs focusing on somatic release and coping skills." So there is precedent. If the organization deliberately uses this terminology for credibility, keep it -- but consider adding a parenthetical or follow-up sentence that translates it for laypeople.

### Monthly Donation Ask

The 4th paragraph is a call to action for monthly donations. This is a specific conversion goal (recurring revenue) that requires more than just text. The stories do not mention:
- A way to distinguish one-time vs. monthly donation
- Whether GoFundMe supports recurring donations (it does, but the link needs to specifically target that option)
- Visual emphasis on the monthly ask (it should not be buried in a paragraph -- it should be a distinct UI element)

**Recommendation:** Add a design specification for the monthly donation CTA. A text paragraph asking for monthly donations has near-zero conversion. This needs to be a button, a card, or a visually distinct callout.

---

## 6. Accessibility Concerns

### Pre-existing Issues Amplified by These Changes

1. **Timeline lightbox keyboard trap:** The current modal implementation uses a manual `keydown` listener for Escape. It does not trap focus within the modal -- a keyboard user can tab behind the modal to the page content. Adding 5 more clickable images (Colors of Hope) makes this worse. The modal should use `inert` on the background content or implement a proper focus trap.

2. **Timeline image button semantics:** `aria-labelledby="open image"` is incorrect on every timeline image button (as noted above). This will be replicated on 5 new images.

3. **GoFundMe embed accessibility:** If the embed is kept, the iframe injected by the GoFundMe script has no `title` attribute, making it invisible to screen readers. If replaced with a direct link, this problem disappears -- one point in favor of removing the embed.

4. **Color contrast on donation button:** The current "Donate" button uses `btn-warning` (warm yellow/gold on dark background). Verify this meets WCAG 2.1 AA contrast ratios. The DaisyUI warning color is `oklch(85% 0.2 85.86)` with content `oklch(6% 0.06 85.86)` -- this should pass, but the specific rendering on a `bg-base-300/90` background needs verification.

5. **New section images:** The 5 Colors of Hope images and the collage hero all need meaningful alt text (not "Image 1", "Image 2"). The stories should include alt text requirements as acceptance criteria.

### New Concerns

6. **TikTok icon:** Ensure the new `icon-tiktok.svelte` component includes appropriate `aria-hidden="true"` if the parent button/link already has text, or `role="img"` with a title if it stands alone. Check how existing icons handle this for consistency.

7. **Nav label change on mobile:** When "Food Access" becomes "Healing Programs," the text is hidden on mobile anyway (icons only). But on tablet/desktop, "Healing Programs" is 16 characters vs. "Food Access" at 11. Verify the navbar does not overflow or wrap at medium breakpoints.

---

## 7. Answers to Open Questions

### Q1: Rename `food-initiative.svelte` to `healing-programs.svelte`?

**Yes.** Component filenames should reflect what they render. A component named `food-initiative.svelte` rendering healing program content is confusing for any developer who touches this codebase later. Also rename the import in `single-page-application.svelte`. This is a zero-risk refactor with high maintainability value.

Also rename or remove `food-baskets.data.ts` accordingly (see Q3).

### Q2: GoFundMe widget -- keep embed or direct link?

**Replace embed with direct link.** Rationale:
- The current embed loads an external script that injects content asynchronously -- performance cost, layout shift, and a dependency on GoFundMe's infrastructure
- The embed URL (`basketsforgaza`) does not match the campaign the buttons link to (`etaam-food-aid-initiative`) -- this is a pre-existing bug that indicates the embed is not maintained
- The new campaign may have a different GoFundMe URL entirely; the embed would need updating regardless
- A well-designed CTA button with social proof text ("Join 500+ supporters") converts nearly as well without the technical debt

**If the client insists on keeping social proof visible:** fetch campaign data server-side at build time (GoFundMe has a public page that can be scraped for amount raised) and display it statically. This gives the benefit without the embed cost.

### Q3: `food-baskets.data.ts` -- remove or repurpose?

**Repurpose** into `healing-programs.data.ts` with updated donation tiers relevant to art therapy:
- $25: "Provide art supplies for a child for one month"
- $50: "Fund a week of art therapy sessions"
- $100: "Sponsor a month of healing programs for a group"

These amounts and descriptions are suggestions -- the client should provide the real ones. But the **pattern** of showing tiered donation amounts with tangible outcomes is a proven charity UX practice and should not be discarded.

If repurposed, the tiers should actually be rendered in the UI this time (they are currently dead code that was never wired up). Add a story for this.

---

## 8. Summary of Recommended Story Additions/Changes

| # | Recommendation | Priority | Relates to |
|---|---------------|----------|------------|
| 1 | Add acceptance criteria for alt text on all new images (Colors of Hope + collage) | High | Stories 2.1, 3.1 |
| 2 | Add story: Update footer social links (currently hardcoded separately from siteData.ts) | High | Epic 1 |
| 3 | Add story or subtask: Bridge language connecting food aid to healing programs | Medium | Story 3.2 |
| 4 | Add story: Repurpose donation tiers for healing programs and render them in the UI | Medium | Epic 3 |
| 5 | Add story: Design monthly donation CTA as a distinct UI element, not body text | Medium | Story 3.2 |
| 6 | Reconsider nav label: "Support Us" or "Donate" instead of "Healing Programs" | Medium | Story 3.3 |
| 7 | Add acceptance criteria: Verify navbar does not overflow at medium breakpoints with new label | Low | Story 3.3 |
| 8 | Tech debt: Refactor footer to consume siteData.ts instead of hardcoding links | Low | Epic 1 |
| 9 | Tech debt: Fix `aria-labelledby` on timeline image buttons | Low | Story 2.2 |
| 10 | Add story: Hero collage placed above body text, not below | Medium | Story 3.1 |
| 11 | Consider adding a "Food Aid Initiative" timeline entry to preserve that history | Low | Epic 3 |

---

## 9. Final Assessment

The proposed changes are sound in direction. Evolving from food aid to art therapy healing programs reflects the organization's real work and is a legitimate update. The stories cover the mechanical changes well.

The gaps are in **transition narrative** (returning donors need bridging language), **conversion design** (the monthly donation ask needs a real UI element, not a paragraph), and **implementation consistency** (footer hardcodes links separately from siteData.ts, creating two places to update).

The highest-risk decision is the GoFundMe embed removal. If done without replacing the social proof it provided, the donation section loses urgency cues. Mitigate with a static social proof line and a strong, visually prominent CTA.

None of these concerns are blockers. They are refinements that will make the difference between a site that updates content and a site that converts visitors into donors.
