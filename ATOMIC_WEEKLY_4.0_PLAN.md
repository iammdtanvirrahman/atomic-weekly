# Atomic Weekly 4.0 — Engineering Plan

Base: atomic-weekly-3.0 commit 9fb58c387b492a447c6c5fcf9357757a01e36354.

All 4.0 work is isolated on branch 4.0. The 2.0, 3.0, and default branches must remain unchanged until review and explicit merge approval.

## Phase sequence

1. Security and trust boundaries.
2. Mobile performance and asset delivery.
3. Maintainability and modular architecture.
4. SEO, accessibility, and editorial polish.
5. Regression QA and release validation.

Each phase must be committed separately. A phase is complete only when its code/documentation changes are committed and its feasible checks have been run. Device, Firebase Console, production deployment, and authenticated Admin Panel checks must remain marked pending until actually executed.

## Phase 1 — Security (partially implemented)

Implemented in the public magazine:
- Hardened the article HTML sanitizer with explicit element and URL allowlists.
- Rejected data URLs and unsafe iframe origins.
- Added client-side submission field validation and bounded attachment metadata.

Blocking items outside this repository:
- The Admin Panel currently signs in anonymously and writes to privileged database paths.
- Cloud Functions verify Firebase ID tokens but do not enforce an admin identity.
- Actual Firebase Realtime Database rules and App Check settings are not included in this repository.

See SECURITY_REVIEW_4.0.md. Do not claim production security is complete until those dependencies are fixed and tested.

## Phase 2 — Performance

- Reduce unnecessary GitHub API calls for hero artwork.
- Use the repository asset manifest and browser caching where appropriate.
- Preserve low-power, reduced-motion, lazy-loading, and WebGL fallback behavior.
- Audit duplicate and oversized assets; only report measured savings after actual image processing and verification.
- Run browser/device profiling where available; do not infer Android performance from source inspection alone.

## Phase 3 — Architecture

- Extract CSS and JavaScript into small, named files.
- Keep the public GitHub Pages URL and Firebase data schema stable.
- Keep optional Three.js code isolated and load it only when required.
- Verify script ordering, relative paths, and direct article URLs after each extraction.

## Phase 4 — SEO, accessibility, editorial polish

- Add canonical and social metadata suitable for the GitHub Pages project URL.
- Improve article card and media semantics, keyboard focus, dialog behavior, and screen-reader labels.
- Respect reduced-motion preferences.
- Preserve the existing visual identity and reader behavior.

## Phase 5 — Regression and release validation

- Check syntax and all relative paths.
- Test feed success, empty feed, feed failure, submission success/failure, reader hash/back/forward, search, filters, and repeated reader open/close.
- Test Android low-memory and data-saver scenarios.
- Test WebGL unavailable and reduced-motion behavior.
- Verify Firebase rules and privileged Admin actions with both admin and non-admin identities.
- Verify deployed GitHub Pages behavior and social previews.

## Release gate

Do not merge 4.0 into the default branch until every feasible automated check passes and all external/manual blockers are either resolved or explicitly accepted by the repository owner.