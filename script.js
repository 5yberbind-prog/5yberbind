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