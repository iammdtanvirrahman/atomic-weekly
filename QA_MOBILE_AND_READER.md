# Atomic Weekly 4.0 — QA Checklist

Run this checklist against a deployed 4.0 preview before merging to the Pages source branch. Record device/browser, network conditions, and results. Do not mark a test passed without running it.

## Automated checks

- [x] GitHub Actions: JavaScript syntax and static page-reference validation passed.
- [x] Headless Chromium smoke tests passed for starter-feed fallback, unsafe HTML/image rejection, invalid email rejection, reader open/close, and submission dialog open/close.
- [ ] Confirm all local CSS/JS/image references resolve on the GitHub Pages project path.
- [ ] Confirm no duplicate HTML IDs.

## Mobile performance

- [ ] Load on an entry-level Android phone with data saver enabled.
- [ ] Verify optimized WebP artwork loads and original-image fallback works.
- [ ] Verify the static background remains attractive when WebGL is unavailable.
- [ ] Verify reduced-motion preference prevents the Three.js scene from loading.
- [ ] Scroll from hero to footer repeatedly; check for jank, blank areas, or layout shifts.
- [ ] Open and close 10 different articles; confirm the page remains responsive and memory does not grow continuously.
- [ ] Open a long article with images, tables, and quotes; verify the reader remains scrollable.
- [ ] Switch tabs and return; confirm animation resumes without duplicate loops.
- [ ] Rotate the device; verify card layout, reader, and scene resize correctly.

## Reader navigation and accessibility

- [ ] Open an article from a featured card and from a regular card.
- [ ] Use the table of contents and verify the target heading is visible below the reader header.
- [ ] Test browser back/forward with a reader hash in the URL.
- [ ] Refresh a direct article URL/hash and verify expected behavior.
- [ ] Confirm opening the reader moves focus to the article heading.
- [ ] Confirm Tab and Shift+Tab remain inside the reader while open.
- [ ] Confirm closing the reader restores focus to the control that opened it.
- [ ] Verify body scroll is restored after closing the reader.
- [ ] Test the submission dialog with keyboard only; focus must remain inside until closed.
- [ ] Check with NVDA, VoiceOver, or TalkBack.

## Feed and submissions

- [ ] Load with a working Firebase connection and with the network disconnected.
- [ ] Verify empty-feed and fallback content states.
- [ ] Submit invalid and oversized inputs; confirm clear validation.
- [ ] Simulate a failed submission; confirm the UI offers a retry and does not claim success.
- [ ] Confirm visitor submissions cannot write to published content (requires actual Firebase rules).
- [ ] Verify the admin workflow is authenticated and unauthorized writes are denied.
- [ ] Verify Cloud Functions reject anonymous/non-admin calls to privileged actions.

## Content safety

- [ ] Test hostile article HTML: event handlers, javascript: links, protocol-relative URLs, data URLs, malformed image URLs, and untrusted iframes.
- [ ] Confirm informative images have useful alt text and decorative images do not create noise.
- [ ] Verify article content remains readable when optional MathJax or external media CDNs fail.

## SEO and deployment

- [ ] Check canonical URL, page title, description, Open Graph, Twitter card, and JSON-LD.
- [ ] Test social preview using a crawler/debugger after deployment.
- [ ] Verify all relative asset URLs on the GitHub Pages project path.
- [ ] Check browser console and network panel for 404s, blocked CDN requests, and uncaught exceptions.
- [ ] Verify 4.0 is not published to the production Pages branch before release approval.

## Result log

For each failed item, record: test ID, device/browser, reproduction steps, expected behavior, actual behavior, console/network error, and screenshot or recording. Fix confirmed defects before adding new visual features.
