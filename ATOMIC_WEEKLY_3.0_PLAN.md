# Atomic Weekly 3.0 — Engineering Plan

Base branch: `atomic-weekly-2.0`

This branch is the isolated 3.0 workstream. Do not merge changes into `main` until review and validation are complete.

## Source inspected

- `index.html` at the 2.0 branch head: `ff09a5db8ac7a07ae938b0673c728fe0f4aca5be`
- The page currently includes a Firebase Realtime Database article feed and submission queue, an article reader, dynamic article cards, and a Three.js ambient scene.
- Existing safeguards include lazy-loaded card images, reduced-motion handling, a low-power/mobile guard for the 3D scene, reader-aware animation pausing, a content sanitizer, and a starter-content fallback.

## Priority 0 — Verify security before changing publishing

- Inspect Firebase Realtime Database rules separately; client-side HTML cannot establish whether the database is secure.
- Confirm only authorized editors can create/update/delete published articles.
- Limit public writes to the submission path and validate accepted fields, string lengths, attachment names, and payload sizes.
- Add abuse controls/rate limits through an appropriate trusted backend if public submissions are enabled.
- Test sanitizer handling for `href`, `src`, iframe origins, and event-handler attributes using hostile sample content.

## Priority 1 — Measure Android performance

- Compare scroll, reader-open, and memory behavior with the ambient 3D scene enabled versus disabled.
- Test on a low-memory Android device and with browser data-saver enabled.
- Profile long tasks during feed rendering and large article opening.
- Measure hero/card image sizes and verify dimensions, lazy loading, and layout stability.
- Confirm the Three.js animation is stopped while the document is hidden or the reader is open, and resumes without duplicate animation loops.

## Priority 1 — Reliability and maintainability

- Split the monolithic page progressively into modules without changing public URLs or Firebase schema:
  - `js/feed.js`: feed loading and article data
  - `js/reader.js`: reader lifecycle, history, and table of contents
  - `js/scene.js`: optional Three.js scene
  - `js/submission.js`: submission form and queue
  - `js/app.js`: initialization and coordination
- Keep each extraction small and verify it on GitHub Pages after each commit.
- Add error states for feed failure, submission failure, and unavailable external assets.
- Test repeated reader open/close cycles, browser back/forward, search/filter combinations, and empty-feed fallback.

## Priority 2 — SEO, accessibility, and editorial polish

- Decide whether article URLs should be individually crawlable; if so, implement stable article URLs and appropriate canonical/share metadata.
- Audit keyboard focus, modal focus restoration, screen-reader names, contrast, and reduced-motion behavior.
- Ensure article images have useful alt text when informative and empty alt text when decorative.
- Clearly explain that website submissions are queued separately from sending attachments by email.

## Acceptance checklist

- [ ] Firebase rules reviewed independently; unauthorized publish/edit/delete attempts are denied.
- [ ] No console errors on initial load, feed failure, reader open/close, or submission.
- [ ] Android scroll and reader interactions remain responsive with 3D disabled and enabled.
- [ ] Reduced-motion and low-power modes avoid loading the 3D scene.
- [ ] Search, category filters, URL hash, back navigation, and fallback content work.
- [ ] GitHub Pages paths and external asset URLs resolve correctly.
- [ ] SEO and accessibility checks are documented before release.

## Important scope note

This document records source-based findings and a safe implementation order. It does not claim that live Firebase rules, real-device performance, or deployed behavior have been tested. Those require separate verification.
