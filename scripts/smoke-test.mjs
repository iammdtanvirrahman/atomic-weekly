import { chromium } from "playwright";
import assert from "node:assert/strict";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
const pageErrors = [];
page.on("pageerror", error => pageErrors.push(error.message));

const firebaseApp = `
export const getApps = () => [];
export const getApp = () => ({});
export const initializeApp = () => ({});
`;
const firebaseDatabase = `
export const getDatabase = () => ({});
export const ref = (db, path) => ({ db, path });
export const push = () => ({ key: "smoke-test-submission" });
export const set = async () => true;
export const onValue = (reference, callback) => {
  if (reference.path === "publishedArticles") callback({ val: () => null });
  return () => {};
};
`;

await page.route("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js", route =>
  route.fulfill({ status: 200, contentType: "application/javascript", body: firebaseApp })
);
await page.route("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js", route =>
  route.fulfill({ status: 200, contentType: "application/javascript", body: firebaseDatabase })
);
await page.route("https://atomictanvir-default-rtdb.firebaseio.com/siteSettings/heroImageLinks.json", route =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ urls: [] }) })
);
await page.route("https://api.github.com/repos/iammdtanvirrahman/atomic-weekly/contents/assets/hero-refresh?ref=4.0", route =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([{ type: "file", name: "cosmic-hero.webp", size: 128591 }])
  })
);
await page.route("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", route =>
  route.fulfill({ status: 404, body: "WebGL intentionally disabled in smoke test" })
);
await page.route("https://fonts.googleapis.com/**", route => route.abort());
await page.route("https://fonts.gstatic.com/**", route => route.abort());

try {
  await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelectorAll(".article-card").length > 0, null, { timeout: 15000 });

  const starterLabel = await page.locator("#feedState").textContent();
  assert.match(starterLabel || "", /Starter edition/i, "empty Firebase feed should show starter content");

  const sanitizerResult = await page.evaluate(() => {
    const html = '<p onclick="alert(1)">safe <a href="javascript:alert(2)">bad link</a><img src="data:image/svg+xml;base64,PHN2Zz4="><iframe src="https://evil.example/embed/x"></iframe><iframe src="https://www.youtube.com/embed/demo"></iframe></p>';
    return window.AtomicContent.sanitizeContent(html);
  });
  assert.doesNotMatch(sanitizerResult, /onclick|javascript:|data:image|evil\.example/i);
  assert.match(sanitizerResult, /youtube\.com\/embed/);
  const unsafeImageRejected = await page.evaluate(() =>
    window.AtomicContent.articleImage({ cover: "data:image/svg+xml;base64,PHN2Zz4=", section: "Science" })
  );
  assert.match(unsafeImageRejected, /cover-cosmos\.svg/);

  const invalidEmailRejected = await page.evaluate(async () => {
    try {
      await window.atomicQueueArticleSubmission({
        author: "Test Reader", email: "not-an-email", title: "Test", section: "Science",
        text: "Smoke test", attachmentNames: []
      });
      return false;
    } catch (error) {
      return /valid email/i.test(error.message);
    }
  });
  assert.equal(invalidEmailRejected, true, "invalid email must be rejected before database write");

  await page.locator(".article-card").first().click();
  await page.waitForFunction(() => document.querySelector("#reader")?.classList.contains("open"));
  assert.match(await page.locator("#readerArticleTitle").textContent() || "", /.+/);
  assert.equal(await page.locator("#reader").getAttribute("aria-hidden"), "false");
  assert.match(page.url(), /#read\//);
  await page.locator("#readerClose").click();
  await page.waitForFunction(() => !document.querySelector("#reader")?.classList.contains("open"));

  await page.locator("#sendArticleBtn").click();
  await page.waitForFunction(() => document.querySelector("#submissionModal")?.classList.contains("open"));
  await page.waitForFunction(() => document.activeElement?.id === "submissionAuthor");
  await page.locator("#cancelSubmission").click();
  await page.waitForFunction(() => !document.querySelector("#submissionModal")?.classList.contains("open"));

  assert.deepEqual(pageErrors, [], "page should not emit uncaught JavaScript errors");
  console.log("Atomic Weekly 4.0 browser smoke test passed.");
} finally {
  await browser.close();
}
