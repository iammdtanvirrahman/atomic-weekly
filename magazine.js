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

function setupSubmitNavigation(){
  document.querySelectorAll('nav a[href="#submit"]').forEach(link => {
    link.href = 'submit.html';
    link.addEventListener('click', event => {
      event.preventDefault();
      window.location.assign('submit.html');
    });
  });

  const inlineSubmit = document.getElementById('submit');
  if (inlineSubmit) inlineSubmit.style.display = 'none';
}

function setupIdeaNavigation(){
  document.querySelectorAll('nav a[href="#idea"], nav a[href="#mailbox"]').forEach(link => {
    link.href = 'idea.html';
    link.textContent = 'Have Any Idea?';
    link.removeAttribute('data-i18n');
    link.addEventListener('click', event => {
      event.preventDefault();
      window.location.assign('idea.html');
    });
  });
}

if (typeof document !== 'undefined') {
  const observer = new MutationObserver(applyImageOverride);
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.addEventListener('DOMContentLoaded', () => {
    applyImageOverride();
    setupSubmitNavigation();
    setupIdeaNavigation();
  });
}
