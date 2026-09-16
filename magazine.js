/*
 * ATOMIC MAGAZINE — CONTENT CONTROL FILE
 */
export const magazine = {
  name: "Atomic Magazine",
  tagline: "Science · Technology · Ideas · Discovery",
  issue: "Vol. 01",
  year: "2026",
  articles: []
};

export const imageOverrides = {
  nafiz: "assets/nafiz1.jpeg"
};

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
    <label for="sImage" style="font:800 .65rem Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">Cover image (optional)</label>
    <input id="sImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/*">
    <img id="sImagePreview" alt="Cover preview" style="display:none;width:100%;max-height:260px;object-fit:cover;border:1px solid var(--line);border-radius:8px">
    <small style="color:var(--muted);font:600 .62rem Arial,sans-serif">The selected cover is attached automatically.</small>
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
      const {getStorage, ref: storageRef, uploadBytes, getDownloadURL} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js');
      const {getDatabase, ref: databaseRef, push, set} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');

      const apps = getApps();
      if (!apps.length) throw new Error('Firebase is not ready yet. Please refresh the page and try again.');

      const app = apps[0];
      const storage = getStorage(app, 'gs://atomictanvir.firebasestorage.app');
      const db = getDatabase(app);
      if (!storage) throw new Error('Firebase Storage could not be initialized.');
      if (!db) throw new Error('Firebase Database could not be initialized.');

      const submissionRef = push(databaseRef(db, 'submissions'));
      const submissionId = submissionRef.key;
      if (!submissionId) throw new Error('Could not create a submission ID.');

      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').slice(-90) || 'cover.jpg';
      const imagePath = `submissions/${submissionId}/${safeName}`;
      const imageRef = storageRef(storage, imagePath);
      if (!imageRef || !imageRef.fullPath) throw new Error('Could not create the Firebase Storage file reference.');

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
        image: imageUrl,
        imageUrl,
        imageName: file.name,
        imageType: file.type,
        imagePath,
        status: 'pending',
        timestamp: Date.now()
      });

      if (status) status.textContent = 'Article + cover sent to the editorial desk ✓';
      form.reset();
      preview.style.display = 'none';
      preview.removeAttribute('src');
    } catch (error) {
      console.error('Automatic cover submission failed:', error);
      const message = error?.message || String(error) || 'upload failed';
      if (status) status.textContent = `Could not send article: ${message}`;
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
