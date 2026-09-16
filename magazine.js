/*
 * ATOMIC MAGAZINE — CONTENT CONTROL FILE
 *
 * Upload your .txt article files and cover images to GitHub, then add them here.
 * You do NOT need to edit index.html for normal magazine updates.
 *
 * Text files are loaded automatically from their paths.
 * Example:
 * {
 *   id: "moon",
 *   section: "Cosmos",
 *   title: "Your article title",
 *   author: "Your Name",
 *   date: "17 September 2026",
 *   image: "assets/moon.jpg",
 *   text: "content/moon.txt"
 * }
 */

export const magazine = {
  name: "Atomic Magazine",
  tagline: "Science · Technology · Ideas · Discovery",
  issue: "Vol. 01",
  year: "2026",

  // Add one object per article. Leave empty until you upload your first article.
  articles: [
    // {
    //   id: "first-story",
    //   section: "Science",
    //   title: "Your article title",
    //   dek: "A short description shown on the magazine front page.",
    //   author: "Atomic Desk",
    //   date: "17 September 2026",
    //   readTime: "6 min read",
    //   image: "assets/first-story.jpg",
    //   text: "content/first-story.txt",
    //   featured: true
    // }
  ]
};

/* Image overrides for articles already stored in Firebase. */
export const imageOverrides = {
  nafiz: "assets/nafiz1.jpeg"
};

/*
 * The Nafiz article is currently stored in Firebase, so its article object
 * may not contain an image field yet. Apply the local GitHub cover image
 * automatically when that article is rendered.
 */
function applyImageOverride(){
  const cards = document.querySelectorAll('#articles .card');
  cards.forEach(card => {
    const meta = card.querySelector('.meta')?.textContent || '';
    const title = card.querySelector('h3')?.textContent || '';
    if (/nafiz/i.test(meta) || /পিঁপড়া ও ফিউশনের গল্প/i.test(title)) {
      const thumb = card.querySelector('.thumb');
      if (thumb) {
        thumb.classList.remove('noimg');
        thumb.style.backgroundImage = `url('${imageOverrides.nafiz}')`;
      }
    }
  });
}

if (typeof document !== 'undefined') {
  const observer = new MutationObserver(applyImageOverride);
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.addEventListener('DOMContentLoaded', applyImageOverride);
}
