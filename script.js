// MENU
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// THEME SWITCH
const themeSel = document.getElementById('themeSelect');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.className = savedTheme;
if (themeSel) themeSel.value = savedTheme;
if (themeSel) themeSel.onchange = () => {
  document.documentElement.className = themeSel.value;
  localStorage.setItem('theme', themeSel.value);
};

// DUMMY DATA (10 items each)
const blogs = [], apps = [], templates = [], resources = [];
for (let i = 1; i <= 10; i++) {
  blogs.push({
    title: `Blog Title ${i}`,
    img: `images/blog${i}.jpg`,
    text: `Quick demo summary for blog ${i}.`
  });
  apps.push({
    title: `App Pack ${i}`,
    img: `images/app${i}.png`,
    desc: `Demo pack ${i} — overlays, presets.`,
    down: `downloads/pack${i}.zip`
  });
  templates.push({ title: `Template ${i}`, down: `downloads/template${i}.zip` });
  resources.push({ title: `Resource ${i}`, down: `downloads/resource${i}.zip` });
}

// RENDER BLOGS
const blogContainer = document.getElementById('blogContainer');
if (blogContainer) {
  blogs.forEach(b => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<img src="${b.img}" alt=""><h3>${b.title}</h3><p>${b.text}</p><button class="btn-outline-small" onclick="alert('Open blog: ${b.title}')">Read</button>`;
    blogContainer.appendChild(el);
  });
}

// RENDER APPS
const appsContainer = document.getElementById('appsContainer');
if (appsContainer) {
  apps.forEach(a => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<img src="${a.img}" alt=""><h3>${a.title}</h3><p>${a.desc}</p>
      <div style="margin-top:10px;display:flex;gap:8px;justify-content:center;">
        <button class="btn-outline-small" onclick="openModal('${a.title}','${a.desc}','${a.img}','${a.down}')">Details</button>
        <button class="btn-primary-small" onclick="downloadFile('${a.down}')"><i class="ri-download-line"></i> Download</button>
      </div>`;
    appsContainer.appendChild(el);
  });
}

// RENDER TEMPLATES
const templateContainer = document.getElementById('templateContainer');
if (templateContainer) {
  templates.forEach(t => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>${t.title}</h3><button class="btn-primary-small" onclick="downloadFile('${t.down}')">Download</button>`;
    templateContainer.appendChild(el);
  });
}

// RENDER RESOURCES
const resourceContainer = document.getElementById('resourceContainer');
if (resourceContainer) {
  resources.forEach(r => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>${r.title}</h3><button class="btn-primary-small" onclick="downloadFile('${r.down}')">Download</button>`;
    resourceContainer.appendChild(el);
  });
}

// MODAL
function openModal(title, desc, img, down) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalImg').src = img;
  const btn = document.getElementById('modalDownload');
  btn.onclick = () => downloadFile(down);
  document.getElementById('appModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('appModal').classList.add('hidden');
}

// Close modal on overlay click
document.getElementById('appModal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Close modal on ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// Download helper
function downloadFile(url) {
  window.open(url, '_blank');
}