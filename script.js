const appDetails = {
  "apps-1": {
    title: "Instagram Pro",
    desc: "Premium Instagram mod with extra privacy, downloader & no ads.",
    tags: "apk, instagram, mod",
    preview: "images/insta.png",
    download: "downloads/insta-pro.apk"
  },
  "apps-2": {
    title: "YouTube Premium Mod",
    desc: "Background play, no ads, HDR support, AMOLED theme.",
    tags: "apk, youtube, mod",
    preview: "images/ytpremium.png",
    download: "downloads/youtube-premium.apk"
  },
  "apps-3": {
    title: "TikTok Lite",
    desc: "Super fast lite app with low battery consumption.",
    tags: "apk, tiktok, lite",
    preview: "images/tiktok.png",
    download: "downloads/tiktok-lite.apk"
  },

  // jitne chaho utne add kar sakte ho
};

/* Pro MAX script.js
   - Renders items per category
   - Search + Tabs filtering
   - Preview modal + Download counter (localStorage)
   - Mouse glow effect
*/

/* ---------- Config: seed data ---------- */
const categories = {
  apps: { title: "Apps Packs", count: 20, id: "appsGrid" },
  tech: { title: "Tech Related", count: 20, id: "techGrid" },
  editing: { title: "Editing Files", count: 20, id: "editingGrid" },
  xml: { title: "XML Templates", count: 20, id: "xmlGrid" },
  design: { title: "Design Templates", count: 20, id: "designGrid" }
};

function makeLabel(categoryKey, index){
  const base = {
    apps: "APP",
    tech: "TECH",
    editing: "EDIT",
    xml: "XML",
    design: "DESIGN"
  }[categoryKey] || "ITEM";
  return `${base} ${index}`;
}
const data = appDetails[itemId];

if (data) {
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalImage.style.backgroundImage = `url('${data.preview}')`;
  modalImage.style.backgroundSize = "cover";
  modalImage.style.backgroundPosition = "center";
  modalTags.textContent = `Tags: ${data.tags}`;
  modalDownloadBtn.onclick = () => window.location.href = data.download;
} else {
  modalTitle.textContent = makeLabel(cat, idx);
  modalDesc.textContent = "Premium resource file.";
  modalImage.textContent = makeLabel(cat, idx);
  modalTags.textContent = "Tags: general";
}
/* ---------- Render items into grid ---------- */
Object.entries(categories).forEach(([key, value])=>{
  const container = document.getElementById(value.id);
  if(!container) return;
  for(let i=1;i<=value.count;i++){
    const id = `${key}-${i}`;
    const item = document.createElement("div");
    item.className = "item-card";
    item.setAttribute("data-cat", key);
    item.setAttribute("data-title", makeLabel(key,i).toLowerCase());
    item.setAttribute("data-id", id);

    // inner structure
    item.innerHTML = `
      <div class="item-badge">${makeLabel(key,i)}</div>
      <div class="item-actions">
        <button class="btn preview" data-action="preview" data-id="${id}">Preview</button>
        <button class="btn download" data-action="download" data-id="${id}">Download</button>
      </div>
    `;
    container.appendChild(item);
  }
});

/* ---------- UI Helpers ---------- */
const tabs = document.querySelectorAll(".tab");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");
const allCards = () => document.querySelectorAll(".item-card");
const visibleCountEl = document.getElementById("visibleCount");

/* Filtering by tab */
tabs.forEach(tab=>{
  tab.addEventListener("click", () => {
    tabs.forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    const fc = tab.dataset.filter;
    applyFilter(fc, searchInput.value.trim().toLowerCase());
  });
});

/* Reset */
resetBtn.addEventListener("click", ()=>{
  searchInput.value = "";
  tabs.forEach(t=>t.classList.remove("active"));
  document.querySelector(".tab[data-filter='all']").classList.add("active");
  applyFilter("all", "");
});

/* Search live */
searchInput.addEventListener("input", (e)=>{
  const q = e.target.value.trim().toLowerCase();
  const active = document.querySelector(".tab.active")?.dataset.filter || "all";
  applyFilter(active, q);
});

/* Apply filter function */
function applyFilter(filterKey, query){
  const cards = allCards();
  let visible = 0;
  cards.forEach(c=>{
    const cat = c.dataset.cat;
    const title = c.dataset.title || "";
    const matchesFilter = (filterKey === "all") || (filterKey === cat);
    const matchesQuery = !query || title.includes(query);
    if(matchesFilter && matchesQuery){
      c.style.display = "";
      visible++;
    } else {
      c.style.display = "none";
    }
  });
  visibleCountEl.textContent = `${visible} visible`;
}

/* initialize */
applyFilter("all","");

/* ---------- Modal logic ---------- */
const modal = document.getElementById("previewModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImage = document.getElementById("modalImage");
const modalTags = document.getElementById("modalTags");
const modalDownloadCount = document.getElementById("downloadCount");
const modalDownloadBtn = document.getElementById("modalDownloadBtn");
const modalPreviewBtn = document.getElementById("modalPreviewBtn");

let currentItemId = null;

document.addEventListener("click", (e)=>{
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if(action === "preview" && id){
    openModal(id);
  } else if(action === "download" && id){
    performDownload(id, e.target);
  }
});

/* open modal with item data */
function openModal(itemId){
  currentItemId = itemId;
  const [cat, idx] = itemId.split("-");
  modalTitle.textContent = `${makeLabel(cat, idx)}`;
  modalDesc.textContent = `This is a premium ${cat} pack number ${idx}. Inside you'll find resources and files ready for use.`;
  modalImage.textContent = makeLabel(cat, idx);
  modalTags.textContent = `Tags: ${cat}, pack, premium`;
  const count = getDownloadCount(itemId);
  modalDownloadCount.textContent = `Downloads: ${count}`;
  modal.setAttribute("aria-hidden", "false");
}

/* close modal */
function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  currentItemId = null;
}
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e)=> { if(e.key === "Escape") closeModal(); });

/* Modal buttons */
modalDownloadBtn.addEventListener("click", ()=>{
  if(currentItemId) performDownload(currentItemId, modalDownloadBtn);
});
modalPreviewBtn.addEventListener("click", ()=>{
  alert("Preview opened (demo) for " + (currentItemId || "item"));
});

/* ---------- Download counter (localStorage) ---------- */
function getDownloadCount(id){
  const raw = localStorage.getItem("downloads");
  const data = raw ? JSON.parse(raw) : {};
  return data[id] || 0;
}
function setDownloadCount(id, val){
  const raw = localStorage.getItem("downloads");
  const data = raw ? JSON.parse(raw) : {};
  data[id] = val;
  localStorage.setItem("downloads", JSON.stringify(data));
}

/* perform download: increments counter and simulates action */
function performDownload(id, btnEl){
  const count = getDownloadCount(id) + 1;
  setDownloadCount(id, count);
  // UI feedback
  if(btnEl){
    const original = btnEl.innerText;
    btnEl.innerText = "Downloaded ✓";
    setTimeout(()=> btnEl.innerText = original, 1400);
  }
  // update modal if open
  if(currentItemId === id){
    modalDownloadCount.textContent = `Downloads: ${getDownloadCount(id)}`;
  }
}

/* ---------- Mouse glow following ---------- */
const glow = document.getElementById("mouseGlow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  // slightly grow near clickable areas
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if(el && (el.classList.contains("btn") || el.classList.contains("item-badge"))){
    glow.style.width = "260px"; glow.style.height = "260px";
  } else {
    glow.style.width = "200px"; glow.style.height = "200px";
  }
});

/* ---------- Accessibility: ensure tab filtering works with keyboard ---------- */
document.querySelectorAll(".tab").forEach(t=>{
  t.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); t.click(); }
  });
});
/* PRO BLOG + GALLERY script.js
   - Single static-file website
   - Edit `posts` object to add new posts (per category)
   - Images should be placed under /images/
   - Downloads under /downloads/
*/

/* ===== POSTS DATA =====
   Add new post objects here. Each post must have:
   id, category, title, date, excerpt, hero (image), gallery (array of images), download (link), content (HTML string)
*/
const posts = [
  {
    id: "apps-1",
    category: "apps",
    title: "Instagram Pro — Feature Packed MOD",
    date: "2025-11-20",
    excerpt: "Instagram Pro mod with inbuilt downloader, ad-free feed & privacy options.",
    hero: "images/insta-hero.jpg",
    gallery: ["images/insta-1.jpg","images/insta-2.jpg","images/insta-3.jpg"],
    download: "downloads/instagram-pro.apk",
    tags: ["apk","instagram","mod"],
    content: `<p>Instagram Pro is a modified APK offering extra features such as background download, ad-free browsing, media saver and more. Follow these steps to use:</p>
              <ol>
                <li>Download APK from the button below.</li>
                <li>Install (allow unknown sources if required).</li>
                <li>Open app & enjoy premium features.</li>
              </ol>`
  },
  {
    id: "apps-2",
    category: "apps",
    title: "YouTube Premium Mod — Background Play",
    date: "2025-10-05",
    excerpt: "Background play, HDR and no ads — lite build for low memory.",
    hero: "images/yt-hero.jpg",
    gallery: ["images/yt-1.jpg","images/yt-2.jpg"],
    download: "downloads/youtube-mod.apk",
    tags: ["apk","youtube","mod"],
    content: `<p>This YouTube mod allows background playback and removes ads. It's ideal for low-spec devices.</p>`
  },
  {
    id: "xml-1",
    category: "xml",
    title: "Dandelions Reels - Alight Motion XML Template",
    date: "2025-10-25",
    excerpt: "1-click Dandelions reels edit template for Alight Motion.",
    hero: "images/dandelions-hero.jpg",
    gallery: ["images/dandelions-1.jpg","images/dandelions-2.jpg"],
    download: "downloads/dandelions-xml.zip",
    tags: ["xml","alight motion","template"],
    content: `<p>Use this XML template to create trending reels quickly in Alight Motion.</p>`
  }
  // Add more posts here...
];

/* ===== App Logic ===== */
const root = document.getElementById("appRoot");
const tabs = document.querySelectorAll(".tab");
const searchInput = document.getElementById("searchInput");

/* Basic client routing by query params:
   - ?post=apps-1  -> show single post
   - ?cat=apps     -> show category page
   - default       -> home (all posts grid)
*/
function getQuery(name){
  const url = new URL(location.href);
  return url.searchParams.get(name);
}

/* Render home grid or category */
function renderList(filterCat = "all", q = ""){
  const list = (filterCat === "all") ? posts.slice() : posts.filter(p=>p.category === filterCat);
  const query = q.trim().toLowerCase();
  const filtered = list.filter(p => !query || (p.title + p.excerpt + p.tags.join(" ")).toLowerCase().includes(query));
  root.innerHTML = `
    <div class="summary">
      <div>Showing ${filtered.length} posts</div>
    </div>
    <div class="grid-cards">
      ${filtered.map(p => cardHtml(p)).join("")}
    </div>
  `;
  attachCardListeners();
}

/* Render single post detail */
function renderPost(postId){
  const p = posts.find(x=>x.id === postId);
  if(!p){ root.innerHTML = `<div style="padding:22px"><h3>Post not found</h3></div>`; return; }

  root.innerHTML = `
    <div class="post-wrap">
      <div class="post-content">
        <div class="post-hero" style="background-image:url('${p.hero}')"></div>
        <div class="post-title">${p.title}</div>
        <div class="post-by">Published ${p.date} • Category: ${capitalize(p.category)}</div>
        <div class="post-body">${p.content}</div>

        <div class="side-box" style="margin-top:12px">
          <div style="display:flex;gap:8px">
            <a class="btn download" href="${p.download}" download>Download</a>
            <button class="btn preview" id="openGallery">Open Gallery</button>
          </div>
        </div>

        <div style="margin-top:16px">
          <div class="side-title">Screenshots / Preview</div>
          <div class="gallery">
            ${p.gallery.map((g,i)=>`<img src="${g}" alt="${p.title} ${i+1}" data-index="${i}" data-post="${p.id}">`).join("")}
          </div>
        </div>
      </div>

      <aside class="sidebar">
        <div class="side-box">
          <div class="side-title">About this pack</div>
          <div class="card-meta">${p.excerpt}</div>
          <div class="card-meta">Tags: ${p.tags.join(", ")}</div>
          <div style="margin-top:10px"><strong>Downloads:</strong> ${getDownloadCount(p.id)}</div>
        </div>

        <div class="side-box">
          <div class="side-title">Related posts</div>
          ${posts.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4).map(r => `<div style="margin:8px 0"><a href="?post=${r.id}" class="related">${r.title}</a></div>`).join("")}
        </div>
      </aside>
    </div>
  `;

  // attach listeners
  document.getElementById("openGallery").addEventListener("click", ()=>{
    openLightbox(p.gallery, 0, p.title);
  });

  document.querySelectorAll(".gallery img").forEach(img=>{
    img.addEventListener("click", (e)=>{
      const idx = Number(e.currentTarget.dataset.index);
      openLightbox(p.gallery, idx, p.title);
    });
  });

  // Download click increments local count
  document.querySelectorAll(".btn.download").forEach(el=>{
    el.addEventListener("click", (e)=>{
      incrementDownload(p.id);
      setTimeout(()=> location.reload(), 400); // refresh to show count
    });
  });
}

/* card HTML used on lists */
function cardHtml(p){
  return `
    <article class="card">
      <div class="card-thumb" style="background-image:url('${p.hero}')"></div>
      <div class="card-title">${p.title}</div>
      <div class="card-meta">${p.date} • ${capitalize(p.category)}</div>
      <div class="card-actions">
        <a class="btn preview" href="?post=${p.id}">Read</a>
        <a class="btn download" href="${p.download}" download data-id="${p.id}">Download</a>
      </div>
    </article>
  `;
}

/* utilities */
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1) }
function attachCardListeners(){
  // intercept download clicks to increment count
  document.querySelectorAll('.card .btn.download').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      if(id){ incrementDownload(id); }
      // allow default to proceed
    });
  });
}

/* ========= Download counter (localStorage) ========= */
function getDownloadCount(id){
  const raw = localStorage.getItem("downloads");
  const data = raw ? JSON.parse(raw) : {};
  return data[id] || 0;
}
function incrementDownload(id){
  const raw = localStorage.getItem("downloads");
  const data = raw ? JSON.parse(raw) : {};
  data[id] = (data[id] || 0) + 1;
  localStorage.setItem("downloads", JSON.stringify(data));
}

/* ========= Lightbox (gallery preview) ========= */
const lightbox = document.getElementById("lightbox");
const lbBackdrop = document.getElementById("lbBackdrop");
const lbClose = document.getElementById("lbClose");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let lbImages = [], lbIndex = 0, lbTitle = "";

function openLightbox(images, index=0, title=""){
  lbImages = images;
  lbIndex = index;
  lbTitle = title;
  showLbImage();
  lightbox.setAttribute("aria-hidden","false");
}

function closeLightbox(){
  lightbox.setAttribute("aria-hidden","true");
}
function showLbImage(){
  lbImage.src = lbImages[lbIndex];
  lbCaption.textContent = `${lbTitle} — ${lbIndex+1}/${lbImages.length}`;
}
lbClose.addEventListener("click", closeLightbox);
lbBackdrop.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", ()=>{ lbIndex = (lbIndex-1+lbImages.length)%lbImages.length; showLbImage(); });
lbNext.addEventListener("click", ()=>{ lbIndex = (lbIndex+1)%lbImages.length; showLbImage(); });
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeLightbox(); if(e.key==="ArrowLeft") lbPrev.click(); if(e.key==="ArrowRight") lbNext.click(); });

/* ========= Tabs / Search UI ========= */
tabs.forEach(t=>{
  t.addEventListener("click", ()=>{
    tabs.forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    const f = t.dataset.filter;
    history.replaceState({}, "", f === "all" ? location.pathname : `?cat=${f}`);
    renderMainFromUrl();
  });
});
searchInput.addEventListener("input", (e)=>{
  const q = e.target.value;
  const active = document.querySelector(".tab.active")?.dataset.filter || "all";
  renderMainFromUrl(active, q);
});

/* ========= Mouse glow ========= */
const glow = document.getElementById("mouseGlow");
document.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ========= Router logic ========= */
function renderMainFromUrl(forcedFilter, forcedQ){
  const postId = getQuery("post");
  const cat = getQuery("cat");
  const q = forcedQ !== undefined ? forcedQ : (searchInput.value || "");
  if(postId){
    renderPost(postId);
  } else {
    const filter = forcedFilter || (cat || "all");
    renderList(filter, q);
  }
}

/* initialize on page load */
window.addEventListener("load", ()=>{
  // mark active tab if url has ?cat=
  const cat = getQuery("cat");
  if(cat){
    document.querySelectorAll(".tab").forEach(t=> t.classList.toggle("active", t.dataset.filter===cat));
  }
  renderMainFromUrl();
});