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

/*
 * Automatic cover-image system for the public "Submit an article" form.
 * The existing page already sends text submissions to Firebase Realtime DB.
 * This enhancement adds a cover picker dynamically, uploads the selected
 * image to Firebase Storage, and saves the resulting URL as imageUrl on the
 * same submission record. The admin panel can therefore publish the cover
 * together with the article without exposing a GitHub token publicly.
 */
async function setupAutomaticSubmissionCover(){
  const form = document.getElementById('submissionForm');
  if (!form || form.dataset.coverSystemReady) return;
  form.dataset.coverSystemReady = '1';

  const status = document.getElementById('sStatus');
  const textArea = document.getElementById('sText');
  if (!textArea) return;

  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gap = '7px';
  wrap.innerHTML = `
    <label for="sImage" style="font:800 .65rem Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">
      Cover image (optional)
    </label>
    <input id="sImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/*">
    <img id="sImagePreview" alt="Cover preview" style="display:none;width:100%;max-height:260px;object-fit:cover;border:1px solid var(--line);border-radius:8px">
    <small style="color:var(--muted);font:600 .62rem Arial,sans-serif">This image will be attached to your article automatically.</small>
  `;
  textArea.insertAdjacentElement('beforebegin', wrap);

  const imageInput = wrap.querySelector('#sImage');
  const preview = wrap.querySelector('#sImagePreview');
  imageInput.addEventListener('change', () => {
    const file = imageInput.files?.[0];
    if (!file) {
      preview.style.display = 'none';
      preview.removeAttribute('src');
      return;
    }
    if (!file.type.startsWith('image/')) {
      imageInput.value = '';
      preview.style.display = 'none';
      if (status) status.textContent = 'Please choose an image file.';
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      imageInput.value = '';
      preview.style.display = 'none';
      if (status) status.textContent = 'Cover image must be 8 MB or smaller.';
      return;
    }
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
  });

  form.addEventListener('submit', async event => {
    const file = imageInput.files?.[0];
    if (!file) return;

    // Capture before the existing submit handler so the image is uploaded
    // first and the normal submission record receives imageUrl.
    event.preventDefault();
    event.stopImmediatePropagation();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent || 'Send to editorial →';

    try {
      if (status) status.textContent = 'Uploading cover image…';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Uploading cover…';
      }

      const {getApps} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const {getStorage, ref, uploadBytes, getDownloadURL} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js');
      const {getDatabase, push, set} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');

      const apps = getApps();
      if (!apps.length) throw new Error('Firebase is not ready yet. Please try again.');

      const app = apps[0];
      const storage = getStorage(app);
      const db = getDatabase(app);
      const submissionRef = push(ref(db, 'submissions'));
      const submissionId = submissionRef.key;
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').slice(-90) || 'cover.jpg';
      const imageRef = ref(storage, `submissions/${submissionId}/${safeName}`);

      await uploadBytes(imageRef, file, {contentType: file.type});
      const imageUrl = await getDownloadURL(imageRef);

      const name = document.getElementById('sName')?.value.trim() || '';
      const email = document.getElementById('sEmail')?.value.trim() || '';
      const title = document.getElementById('sTitle')?.value.trim() || '';
      const section = document.getElementById('sSection')?.value || 'Science';
      const text = document.getElementById('sText')?.value || '';

      if (!name || !title || !text) throw new Error('Please complete the required article fields.');

      await set(submissionRef, {
        author: name,
        email,
        title,
        section,
        text,
        imageUrl,
        imageName: file.name,
        imageType: file.type,
        status: 'pending',
        timestamp: Date.now()
      });

      if (status) status.textContent = 'Article + cover sent to the editorial desk ✓';
      form.reset();
      preview.style.display = 'none';
      preview.removeAttribute('src');
    } catch (error) {
      console.error('Automatic cover submission failed:', error);
      if (status) status.textContent = `Could not send article: ${error?.message || 'upload failed'}`;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  }, true);
}

if (typeof document !== 'undefined') {
  const observer = new MutationObserver(applyImageOverride);
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.addEventListener('DOMContentLoaded', () => {
    applyImageOverride();
    setupAutomaticSubmissionCover();
  });
}
