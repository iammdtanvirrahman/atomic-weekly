# Atomic Magazine

A mobile-first dark editorial magazine for science, space, technology, love, philosophy, nature and art.

## Public publishing feed
The site listens to Firebase Realtime Database path \`publishedArticles\` in the same \`atomictanvir\` project used by Atomic Admin. Only records with \`status: "published"\` or \`published: true\` are shown in the live feed. Changes made from the admin panel appear in the magazine automatically.

## Editorial desk
Use: https://iammdtanvirrahman.github.io/atomic-weekly-admin-panel/

## Design notes
- Responsive, mobile-first layout with bottom navigation on small screens.
- Three.js orbital/particle scene loads progressively and has a reduced-motion / CDN-failure fallback.
- Content is loaded from the published feed; starter editorial samples are used when no published records are available or the feed cannot be reached.
- Reader content is sanitized before display.
- Artwork in \`assets/\` consists of custom vector illustrations plus an optimized generated cosmic hero image.

## Deployment
The branch is \`feature/editorial-upgrade\`. Preview source: https://github.com/iammdtanvirrahman/atomic-weekly/tree/feature/editorial-upgrade
GitHub Pages for the public site will reflect this version after it is merged into the Pages source branch.
