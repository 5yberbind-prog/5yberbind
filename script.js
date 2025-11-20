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