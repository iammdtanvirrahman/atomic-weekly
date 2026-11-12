# Atomic Weekly 4.0

A mobile-first dark editorial magazine for science, space, technology, love, philosophy, nature, and art.

## Architecture

- `index.html`: semantic page shell and metadata.
- `css/atomic.css`: visual system and responsive magazine/reader styles.
- `js/content.js`: shared article metadata, formatting, URL, and HTML-sanitization helpers.
- `js/feed.js`: Firebase article feed and validated public submission queue.
- `js/app.js`: search, filters, card rendering, reader navigation, and article reading experience.
- `js/scene.js`: optional Three.js ambient scene; preserves the static fallback.
- `js/submission.js`: reader-facing article submission workflow.
- `assets/`: original artwork and source images.
- `assets/optimized/`: generated WebP derivatives. Original assets remain available as fallbacks.
- `scripts/optimize-assets.py`: reproducible image derivative generator.
- `scripts/check-source.py`: local reference and duplicate-ID validation.

## Public publishing feed

The site listens to Firebase Realtime Database path `publishedArticles` in the same `atomictanvir` project used by Atomic Admin. Only records with `status: "published"` or `published: true` are shown. Starter editorial samples remain available when the feed is empty or unavailable.

## Editorial desk

https://iammdtanvirrahman.github.io/atomic-weekly-admin-panel/

## Performance

- The asset pipeline creates WebP derivatives using Pillow.
- The hero artwork prefers optimized local WebP files and falls back to original artwork.
- Card images use lazy loading and asynchronous decoding.
- The optional Three.js scene respects reduced-motion and low-power checks.
- GitHub Actions validates JavaScript syntax and local page references on branch `4.0`.

To regenerate optimized assets locally:

```bash
python -m pip install Pillow
python scripts/optimize-assets.py
python scripts/check-source.py
node --check js/content.js
node --check js/feed.js
node --check js/app.js
node --check js/scene.js
node --check js/submission.js
```

## Security boundary

The public page uses Firebase's browser configuration; this is not an admin credential. Client-side validation and HTML sanitization do not replace Firebase Realtime Database rules, App Check, or server-side authorization.

See [SECURITY_REVIEW_4.0.md](./SECURITY_REVIEW_4.0.md) for the verified limitations. The separate Admin Panel currently uses anonymous Firebase authentication, so privileged publishing security remains an external release blocker until that authentication model and Cloud Function authorization are corrected.

## Deployment

This work is isolated on branch `4.0`. It has not been merged into the GitHub Pages source branch. Do not treat the preview as a production release until the release checklist and external security requirements are complete.
