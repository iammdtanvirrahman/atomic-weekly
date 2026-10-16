# Atomic Weekly 3.0 — Mobile QA Checklist

Run this checklist against the deployed preview before merging to `main`. Record device/browser, network conditions, and results. Do not mark a test passed without running it.

## Mobile performance
- [ ] Load on an entry-level Android phone with data saver enabled.
- [ ] Verify the static background remains attractive when WebGL is unavailable.
- [ ] Verify reduced-motion preference prevents the Three.js scene from loading.
- [ ] Scroll from hero to footer repeatedly; check for jank, blank areas, or layout shifts.
- [ ] Open and close 10 different articles; confirm the page remains responsive and memory does not grow continuously.
- [ ] Open a long article with images, tables, and quotes; verify the reader remains scrollable.
- [ ] Switch tabs and return; confirm animation resumes without duplicate loops.
- [ ] Rotate the device; verify card layout, reader, and scene resize correctly.

## Reader navigation
- [ ] Open an article from a featured card and from a regular card.
- [ ] Use the table of contents and verify the target heading is visible below the reader header.
- [ ] Test browser back/forward with a reader hash in the URL.
- [ ] Refresh a direct article URL/hash and verify expected behavior.
- [ ] Confirm closing the reader restores focus to the control that opened it.
- [ ] Verify body scroll is restored after closing the reader.

## Feed and submissions
- [ ] Load with a working Firebase connection and with the network disconnected.
- [ ] Verify empty-feed and fallback content states.
- [ ] Submit invalid and oversized inputs; confirm clear validation.
- [ ] Simulate a failed submission; confirm the UI offers a retry and does not claim success.
- [ ] Confirm visitor submissions cannot write to published content (requires testing against actual Firebase rules).
- [ ] Verify the admin workflow is separately authenticated and unauthorized writes are denied.

## Accessibility and content safety
- [ ] Navigate all interactive elements using keyboard only.
- [ ] Check focus visibility and modal focus trapping/restoration.
- [ ] Test with screen reader labels enabled.
- [ ] Test hostile article HTML: event handlers, `javascript:` links, untrusted iframes, malformed image URLs.
- [ ] Confirm informative images have useful alt text and decorative images do not create noise.

## SEO and deployment
- [ ] Check page title, description, Open Graph image/title/description.
- [ ] Test social preview using a crawler/debugger after deployment.
- [ ] Verify every relative asset URL on the GitHub Pages project path.
- [ ] Check browser console and network panel for 404s, blocked CDN requests, and uncaught exceptions.

## Result log
For each failed item, record: test ID, device/browser, reproduction steps, expected behavior, actual behavior, console/network error, and screenshot or recording. Fix confirmed defects before adding new visual features.
