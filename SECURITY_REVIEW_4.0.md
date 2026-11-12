# Atomic Weekly 4.0 — Security Review

## Scope and status

This review covers the public magazine frontend in this repository. It does not claim that Firebase Realtime Database rules or the separate Atomic Admin Panel have been secured or deployed.

## Changes made in 4.0 Phase 1

- Replaced the article HTML sanitizer with an explicit element allowlist.
- Removed SVG, MathML, scriptable, form, metadata, and embedded-object elements from article HTML.
- Removed all unapproved attributes before selectively restoring safe attributes.
- Restricted article links to HTTPS, same-origin HTTP, mailto, and fragment links.
- Restricted article images to HTTPS or same-origin URLs; data: and protocol-relative external URLs are rejected.
- Restricted video embeds to HTTPS YouTube, YouTube NoCookie, and Vimeo embed endpoints.
- Added noopener noreferrer to external links and lazy/referrer controls to media.
- Added strict client-side submission validation for name, email, title, category, article length, and attachment-name count/length.

## Important security limitations

Client-side validation is usability validation, not an authorization boundary. A visitor can bypass browser JavaScript and call Firebase directly.

The Firebase configuration embedded in the public page is a Firebase web-app configuration, not an admin credential. Its presence is expected for a browser app. Security depends on Firebase Authentication, App Check, and Realtime Database Security Rules.

The separate repository atomic-weekly-admin-panel currently uses signInAnonymously(auth) and its editor performs reads/writes against publishedArticles, submissions, and atomicWeekly/*. The Cloud Functions atomicAi and atomicUploadAsset verify an ID token but do not currently enforce an admin identity; an anonymous Firebase ID token is still a valid ID token. A safe database rule set cannot distinguish a trusted editor from an arbitrary anonymous user while both use anonymous authentication.

**Do not deploy permissive rules that allow anonymous writes to publishedArticles or atomicWeekly.** Before production security can be marked complete:

1. Replace anonymous editor sessions with a real sign-in provider.
2. Restrict editor access to an explicit allowlist or Firebase custom admin claim.
3. Require that authorization in the database rules and in every privileged Cloud Function.
4. Keep public website submissions limited to create-only writes at submissions, with strict server-side field and size validation.
5. Add Firebase App Check and server-side abuse controls for public submissions.
6. Test unauthorized publish, edit, delete, upload, and AI requests using a non-admin account.

No production Firebase rules were changed by this repository commit.

## Manual verification still required

- Test malicious article HTML including event handlers, javascript: URLs, protocol-relative URLs, data URLs, malformed embeds, and unsafe iframe origins.
- Verify the actual Realtime Database rules in Firebase Console or the Firebase CLI.
- Verify the Admin Panel and Cloud Functions after the authentication model is corrected.
- Review Firebase App Check enforcement and abuse monitoring.