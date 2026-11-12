# Atomic Weekly 4.0 — Engineering Plan

Base: atomic-weekly-3.0 commit 9fb58c387b492a447c6c5fcf9357757a01e36354.

All 4.0 work is isolated on branch 4.0. The 2.0, 3.0, and default branches have not been modified by this work.

## Phase status

| Phase | Status | Notes |
|---|---|---|
| 1. Security | Frontend hardening committed; production security blocked | Sanitizer and submission validation improved. Admin authentication, database rules, App Check, and Cloud Function authorization remain external blockers. |
| 2. Performance | Asset pipeline implemented | 26 WebP derivatives generated; source/derivative total reduced from 44.94 MB to 4.15 MB (90.8% smaller across those pairs). Hero now prefers optimized local artwork. Real-device profiling remains pending. |
| 3. Architecture | Progressive modularization committed | CSS, content helpers, Firebase feed, app controller, Three.js scene, and submission UI are separate files. Reader and card UI remain coordinated in app.js to avoid a risky rewrite of shared state. |
| 4. SEO and accessibility | Initial improvements committed | Canonical/social metadata, WebSite JSON-LD, reader dialog semantics, focus handling, and modal focus trap added. Screen-reader and real keyboard testing remain pending. |
| 5. Regression and release validation | Automated checks passing | GitHub Actions passes JavaScript syntax, local-reference/duplicate-ID checks, and headless browser smoke tests for feed fallback, sanitizer, submission validation, reader open/close, and submission dialog. Android, live Firebase, and deployed preview tests remain pending. |

## Phase 1 — Security

Implemented in the public magazine:
- Explicit HTML element allowlist and attribute reset.
- HTTPS/same-origin URL restrictions for article links and images.
- Strict allowlist for embedded video providers.
- Client-side validation for name, email, category, title, article text, and attachment metadata.

Important limitation:
- Client-side validation is not a security boundary.
- The separate Admin Panel currently uses anonymous Firebase authentication for privileged database paths.
- Cloud Functions verify Firebase ID tokens but do not currently enforce an admin identity.
- Actual Firebase Realtime Database rules and App Check settings are not stored or deployed from this repository.

See SECURITY_REVIEW_4.0.md. Production security must not be marked complete until Admin authentication, custom claims/allowlist, database rules, Cloud Function authorization, App Check, and non-admin negative tests are completed.

## Phase 2 — Performance

Implemented:
- Pillow-based reproducible WebP generation in scripts/optimize-assets.py.
- GitHub Actions asset pipeline creates derivatives and updates assets/assets.json on branch 4.0.
- Hero artwork prefers generated optimized WebP and retains original-image fallback.
- Static GitHub artwork listing uses browser cache.
- Existing lazy loading, asynchronous decoding, reduced-motion, low-power, and WebGL fallback behavior retained.

Measured:
- 26 source/derivative pairs.
- Source total: 44.94 MB.
- WebP total: 4.15 MB.
- Reduction: 90.8% across those pairs.

Still pending:
- Profile on a low-memory Android device and with data saver enabled.
- Measure page transfer size and long tasks in browser DevTools.
- Confirm newly uploaded assets are optimized after deployment to the Pages branch.

## Phase 3 — Architecture

Extracted:
- css/atomic.css
- js/content.js
- js/feed.js
- js/app.js
- js/scene.js
- js/submission.js

The HTML shell is now 18,550 bytes versus 133,474 bytes in 3.0 (86.1% smaller as an HTML document; CSS and JavaScript are now separate cached assets). The reader and card-rendering lifecycle remain in app.js because they share state and DOM lifecycle. Further separation should be incremental and regression-tested rather than introducing a broad rewrite.

## Phase 4 — SEO and accessibility

Implemented:
- Canonical homepage URL, Open Graph URL/type/image, Twitter summary metadata, robots metadata, and WebSite JSON-LD.
- Reader is exposed as a labelled modal dialog and focuses its article heading.
- Reader keyboard focus is contained while open.
- Submission dialog keyboard focus is contained while open.
- Existing focus restoration, visible focus styling, and reduced-motion behavior retained.

Still pending:
- Keyboard-only walkthrough on desktop and mobile.
- NVDA/VoiceOver/TalkBack review.
- Social preview crawler test after a deployed preview exists.
- Article-specific share previews: hash-based reader routes are not independently crawlable by social crawlers.

## Phase 5 — Regression and release validation

Automated — passing in GitHub Actions run 43192599216:
- Node syntax checks for all JavaScript modules and the browser test script.
- Python static-site check verifies local HTML references and duplicate IDs.
- Headless Chromium smoke tests verify empty-feed fallback, sanitizer rejection of unsafe HTML/URLs, invalid email rejection, reader open/close and URL hash, and submission dialog focus/open/close.

Manual — still pending:
- Live Firebase feed success and offline fallback.
- Submission success/failure and validation.
- Reader open/close, direct hash, back/forward, search, and filters.
- 10 repeated reader open/close cycles and long-article scrolling.
- Android low-memory/data-saver testing.
- Reduced-motion and WebGL-unavailable testing.
- Firebase rules and privileged actions tested with admin and non-admin identities.
- GitHub Pages paths and social previews.

## Release gate

Do not merge 4.0 into the default branch until all automated checks pass, manual QA is recorded, and the external Firebase/Admin security blockers are resolved or explicitly accepted by the repository owner.
