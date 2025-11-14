// Core interactive features: splash, theme toggle, sidebar, routing, detail, download timer, hover sound

// ========== Splash ==========
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  setTimeout(() => {
    splash.style.transition = 'opacity .4s ease, transform .4s ease';
    splash.style.opacity = '0';
    splash.style.transform = 'scale(.98)';
    setTimeout(()=>splash.remove(), 450);
  }, 900); // short splash
});

// ========== Theme Toggle (dark/light) ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light-theme'), themeToggle.textContent = '☀️';
themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-theme');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
/* Light theme quick vars */
const style = document.documentElement.style;
if (!savedTheme || savedTheme === 'dark') {
  // keep default neon look
} else {
  // light adjustments (optional)
  document.documentElement.style.setProperty('--bg', '#f6fbff');
  document.documentElement.style.setProperty('--card', '#ffffff');
  document.documentElement.style.setProperty('--muted', '#475569');
}

// ========== Sidebar toggle ==========
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle.addEventListener('click', ()=> sidebar.classList.toggle('collapsed'));

// ========== Routing & Tabs ==========
const pages = document.querySelectorAll('.page');
function showPage(name) {
  pages.forEach(p => {
    if (p.dataset.page === name) p.hidden = false;
    else p.hidden = true;
  });
  // scroll to top of main area
  window.scrollTo({top:0, behavior:'smooth'});
}
function routeFromHash() {
  const hash = location.hash.replace('#','') || 'home';
  if (['home','detail','download'].includes(hash)) {
    showPage(hash);
  } else {
    // section-specific (editing, tech, gaming) -> show home and scroll to section
    showPage('home');
    const sec = document.querySelector(`[data-section="${hash}"]`);
    if (sec) setTimeout(()=> sec.scrollIntoView({behavior:'smooth', block:'start'}), 100);
  }
}
window.addEventListener('hashchange', routeFromHash);
routeFromHash(); // initial

// Top nav / sidebar linking (set active)
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click',(e)=>{
    // let hash handle it
  });
});
document.querySelectorAll('.side-link').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const f = btn.dataset.filter;
    if (f==='all') location.hash = '#home';
    else location.hash = `#${f}`;
  });
});

// ========== Card hover sound ==========
const hoverSnd = document.getElementById('hover-snd');
function playHoverSound(){
  // many browsers block audio play without user gesture; try-catch
  try { hoverSnd.currentTime = 0; hoverSnd.play().catch(()=>{}); } catch(e){}
}
document.body.addEventListener('mouseover', (e)=>{
  const card = e.target.closest('.app-card');
  if (card) playHoverSound();
});
document.body.addEventListener('mouseover', (e)=>{
  const btn = e.target.closest('.dl-btn');
  if (btn) playHoverSound();
});

// ========== Card animations entrance ==========
document.querySelectorAll('.app-card').forEach((c,i)=>setTimeout(()=>c.classList.add('show'), i*35));

// ========== Search filter ==========
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.app-card').forEach(card=>{
    const name = (card.dataset.name||'').toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
});

// ========== Details modal / SPA detail page ==========
const detailPage = document.getElementById('detail-page');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailSize = document.getElementById('detail-size');
const detailVer = document.getElementById('detail-ver');
const detailDownloadBtn = document.getElementById('detail-download');
const backHomeBtn = document.getElementById('back-home');
const infoButtons = document.querySelectorAll('.info-btn');

let currentApp = null;

infoButtons.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const app = btn.dataset.app;
    openDetail(app);
  });
});
function openDetail(appName){
  // populate with placeholder info - you can customize per-app
  currentApp = appName;
  detailTitle.textContent = appName;
  detailDesc.textContent = appName + ' — Ye ek sample description hai. Isko aap apne real features, changelog aur screenshots se replace kar sakte ho.';
  detailSize.textContent = '25 MB';
  detailVer.textContent = '1.0.0';
  // show detail page
  location.hash = '#detail';
  showPage('detail');
}
backHomeBtn.addEventListener('click', ()=> {
  location.hash = '#home';
  showPage('home');
});
detailDownloadBtn.addEventListener('click', ()=> {
  if (!currentApp) return;
  openDownloadPage(currentApp);
});

// ========== Download flow (timer + links) ==========
const downloadPage = document.getElementById('download-page');
const downloadAppTitle = document.getElementById('download-app');
const countdownEl = document.getElementById('countdown');
const downloadLinks = document.getElementById('download-links');
const dlLink1 = document.getElementById('dl-link-1');
const dlLink2 = document.getElementById('dl-link-2');
const backFromDownloadBtn = document.getElementById('back-from-download');

backFromDownloadBtn.addEventListener('click', ()=>{
  location.hash = '#home';
  showPage('home');
});

function openDownloadPage(appName){
  location.hash = '#download';
  showPage('download');
  downloadAppTitle.textContent = 'Preparing: ' + appName;
  downloadLinks.hidden = true;
  let t = 5; // seconds countdown
  countdownEl.textContent = t;
  const inter = setInterval(()=>{
    t -= 1;
    if (t <= 0) {
      clearInterval(inter);
      countdownEl.textContent = 0;
      // show final links (replace '#' with real URLs)
      document.getElementById('download-links').hidden = false;
      document.getElementById('dl-link-1').href = '#'; // replace with real
      document.getElementById('dl-link-2').href = '#'; // replace with real
      // optional: auto-click primary link after a short delay (commented out)
      // setTimeout(()=>document.getElementById('dl-link-1').click(), 1000);
    } else {
      countdownEl.textContent = t;
    }
  }, 1000);
}

// Quick modal for direct download buttons in grids
const modal = document.getElementById('modal');
const modalAppName = document.getElementById('modal-app');
const modalLink1 = document.getElementById('modal-link1');
const modalLink2 = document.getElementById('modal-link2');
const modalClose = document.getElementById('modal-close');

document.body.addEventListener('click', (e)=>{
  const dl = e.target.closest('.dl-btn');
  if (dl && dl.dataset.app) {
    e.preventDefault();
    const app = dl.dataset.app;
    openQuickModal(app);
  }
});
function openQuickModal(appName){
  modalAppName.textContent = appName;
  modalLink1.href = '#';
  modalLink2.href = '#';
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });
function closeModal(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }

// ========== Multi-page navigation (nav links update hash) ==========
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click',(e)=>{
    // let the hash change; routing will handle it
  });
});

// ========== Accessibility & keyboard shortcuts ==========
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') {
    // close modal or go home
    if (modal.style.display === 'flex') closeModal();
    else { location.hash = '#home'; showPage('home'); }
  }
});

// Optional: persist sidebar collapsed state
if (localStorage.getItem('sidebar-collapsed') === 'true') sidebar.classList.add('collapsed');
sidebarToggle.addEventListener('click', ()=> localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed')));

// End of script