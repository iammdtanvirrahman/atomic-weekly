# Atomic Weekly — Backend & Feature Safety Register

> Purpose: preserve existing data contracts and user-facing workflows during UI/animation work. Update this register before any future backend refactor. Visual changes must not remove or rename these paths, fields, forms, event hooks, or external integrations.

## Repositories and deployment
- Main public magazine: `iammdtanvirrahman/atomic-weekly`, default branch `main`, GitHub Pages: `https://iammdtanvirrahman.github.io/atomic-weekly/`.
- Separate admin repository: `iammdtanvirrahman/atomic-weekly-admin-panel`. Treat it as a separate application; do not assume the main repository contains the admin editor or Firebase Functions.
- Firebase project: `atomictanvir`; Realtime Database: `https://atomictanvir-default-rtdb.firebaseio.com`; Firebase JS SDK currently referenced at version `10.12.0`.
- Never put GitHub tokens, OpenAI keys, Firebase service-account credentials, or other server secrets in public HTML/JS, commits, or this file. The GitHub token used by upload/publish automation belongs in Firebase Secret Manager / server configuration only.

## Firebase Realtime Database paths observed in the current front-end
- `publishedArticles/`: public magazine reads published records; Admin writes/publishes, edits and unpublishes articles. Keep article IDs and record fields intact.
- `submissions/`: visitor article/story submissions and Admin pending queue; includes fields such as `submissionId`, `author`, `email`, `title`, `section`, `text`, `status`, `timestamp`, optional `imageUrl` / `imageType`, `type`, and `submissionType`.
- `pdfSubmissions/`: PDF/document submission inbox and editing/publishing flow. Preserve `pdfUrl`, `coverImage`, `type: 'pdf'`, and associated metadata.
- `messages/`: idea/correction/question inbox; current writes include `name`, `email`, `message`, `createdAt`, `status: 'new'`, and `type: 'idea'`.
- `comments/` and `reactions/`: known magazine interaction features from the project history; verify current implementation before changing these integrations.
- `assets/` and `content/`: GitHub-hosted article images and content text files; current Admin editor may sync these through the GitHub API.

## Public website responsibilities to preserve
- Live Firebase listener for published articles and support for records marked `status: 'published'` or `published: true`.
- Search and section filtering, including the special Stories section.
- English/Bangla language toggle and localized headings, category labels, and navigation.
- Article cards and full article reader; support cover images, rich HTML article content, images, tables, blockquotes, links and embedded media.
- Reader close via close button, backdrop and Escape; URL hash deep links to articles; restore the prior scroll position without recursive navigation or undefined-variable errors.
- Submit navigation to `submit.html`, ideas to `idea.html`, and responsive mobile navigation.
- Article submission, writer-story submission, article-with-image submission, document/Gmail handoff, and idea submission.
- Admin editor functions in `admin.html`: article publishing/editing/unpublishing, pending submissions review/edit/delete/publish, PDF inbox/edit/publish, optional GitHub sync and image upload.
- Asset workflow and `.github/workflows/assets-manifest.yml`.

## Backend integrations from project history — do not silently remove
- Firebase Functions / secure server-side workflows previously referenced: `atomicAi`, `atomicUploadAsset`, `atomicPublish`, `atomicComments`, and `atomicReactions`. Verify their current deployed state in the separate admin/backend project before touching them.
- AI editor features previously requested: rewrite/improve/shorten/expand, Bangla-English rewrite, headline, excerpt, grammar, summarize, tags, continue, custom instruction; selected-text Replace or cursor Insert.
- Auth restrictions and server-side secret handling: Firebase ID-token verification, allowed-email restriction, OpenAI key in Firebase Secret Manager, GitHub token in Firebase Secret Manager. Never move secrets to the browser.
- Image upload flow previously described: device image → authenticated Firebase backend → `atomic-weekly/assets/`, safe unique filenames, editor insertion, asset-manager refresh; deployment/configuration must remain intact.

## Safe-change rules
1. UI-only changes should stay in `index.html` CSS and small progressive-enhancement JavaScript; do not rewrite Firebase initialization, database paths, record schemas, admin code, submission forms, or the admin repository.
2. Keep all original IDs used by JavaScript (including `lang`, `ticker`, `heroEyebrow`, `heroTitle`, `heroDesc`, `deskTitle`, `deskDesc`, `latest`, `latestTitle`, `count`, `search`, `filter`, `articles`, `sections`, `sectionsTitle`, `explore`, `foot1`, `foot2`, `reader`, `close`, `readerImage`, `readerTitle`, `readerText`).
3. Avoid destructive changes and direct database writes during visual redesign. Do not delete articles, submissions, assets, or user data.
4. Respect `prefers-reduced-motion`, avoid scroll-jacking, avoid heavy continuous animation on mobile, and keep controls keyboard/touch accessible.
5. Before deploying, test page load, Firebase read listener, article search/filter, language switch, article open/close, deep-link behavior, submit/idea links, and mobile layout.
6. Record future fixes here, but do not treat this file as a substitute for checking the deployed Firebase Functions and rules.

## Known regression risks to check
- Article reader open/close has previously caused Android freezes and console errors involving `previousScrollY is not defined`, repeated `openReader` calls, navigation throttling, and a maximum call stack. Keep reader navigation non-recursive and scroll restoration guarded.
- Past reports included an unexpected `)` syntax error, language toggle problems, layout shifts in the top bar, and a missing Stories category in admin filters.
- Avoid reintroducing the removed full-magazine scroll-reader mode or placeholder comment UI beneath article titles.
