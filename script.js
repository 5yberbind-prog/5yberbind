/* --------- Data (replace/extend as needed) --------- */
const apps = [
  { title: "PhotoEditor Pro", img: "assets/thumb_1.png", desc: "Advanced Image Editor", link: "downloads/app1.zip" },
  { title: "VideoMaster X", img: "assets/thumb_2.png", desc: "Pro video editing suite", link: "downloads/app2.zip" },
  { title: "FontPack 500", img: "assets/thumb_3.png", desc: "500 premium fonts", link: "downloads/app3.zip" },
  { title: "XML UI Kit", img: "assets/thumb_4.png", desc: "100 ready XML layouts", link: "downloads/app4.zip" },
  { title: "Ad-Pack Templates", img: "assets/thumb_5.png", desc: "Banner & Ad templates", link: "downloads/app5.zip" },
  { title: "Game HUDs", img: "assets/thumb_6.png", desc: "Editable HUD assets", link: "downloads/app6.zip" }
];

const templates = [
  { title: "Template 1", img: "assets/thumb_7.png", link: "downloads/template1.zip" },
  { title: "Template 2", img: "assets/thumb_8.png", link: "downloads/template2.zip" },
  { title: "Template 3", img: "assets/thumb_9.png", link: "downloads/template3.zip" },
  { title: "Template 4", img: "assets/thumb_10.png", link: "downloads/template4.zip" }
];

const blogs = [
  { title: "How to Edit XML Files", img: "assets/thumb_1.png", desc: "Step-by-step guide", readMore: "#" },
  { title: "Create Viral Shorts", img: "assets/thumb_2.png", desc: "Script + thumbnails", readMore: "#" },
  { title: "Website UI Design", img: "assets/thumb_3.png", desc: "Pro layout tips", readMore: "#" }
];

/* --------- Render cards --------- */
function loadCards(data, containerId, type = "download") {
  const box = document.getElementById(containerId);
  box.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="card-title">${item.title}</div>
      <div class="card-desc">${item.desc || ""}</div>
      <div class="card-meta">
        <div class="meta-left"></div>
        <div class="meta-right">
          ${item.link ? `<a class="card-btn" href="${item.link}">Download</a>` : `<a class="card-btn" href="${item.readMore}">Read</a>`}
        </div>
      </div>
    `;
    box.appendChild(card);
  });
}

loadCards(apps, "apps-container");
loadCards(templates, "templates-container");
loadCards(blogs, "blogs-container");

/* --------- Neon cursor behavior --------- */
const cursor = document.getElementById("cursor-dot");
const glow = document.getElementById("cursor-glow");
let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
let glowX = mouseX, glowY = mouseY;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + "px"; cursor.style.top = mouseY + "px";
  // smooth follow for glow
  glowX += (mouseX - glowX) * 0.18;
  glowY += (mouseY - glowY) * 0.12;
  glow.style.left = glowX + "px"; glow.style.top = glowY + "px";
});

// click expand effect
document.addEventListener("mousedown", () => {
  cursor.classList.add("click"); glow.classList.add("click");
});
document.addEventListener("mouseup", () => {
  cursor.classList.remove("click"); glow.classList.remove("click");
});

// pointer interactions on clickable elements - highlight cursor
document.querySelectorAll("a, button, .card").forEach(el => {
  el.addEventListener("mouseenter", () => { cursor.classList.add("click"); });
  el.addEventListener("mouseleave", () => { cursor.classList.remove("click"); });
});

/* --------- Particle background (lightweight) --------- */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
const particles = [];
const PARTICLE_COUNT = Math.floor((w*h)/90000); // adaptive

function random(min,max){ return Math.random()*(max-min)+min; }

class Particle {
  constructor(){
    this.reset();
  }
  reset(){
    this.x = random(0,w);
    this.y = random(0,h);
    this.vx = random(-0.2,0.2);
    this.vy = random(-0.2,0.2);
    this.size = random(0.6,2.6);
    this.alpha = random(0.06,0.18);
    this.h = random(170,200);
  }
  update(){
    // gentle float + attraction to mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy) + 0.001;
    this.vx += (dx/dist) * 0.0006;
    this.vy += (dy/dist) * 0.0006;
    this.x += this.vx;
    this.y += this.vy;
    // wrap
    if(this.x < -20) this.x = w + 20;
    if(this.x > w + 20) this.x = -20;
    if(this.y < -20) this.y = h + 20;
    if(this.y > h + 20) this.y = -20;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.h},90%,60%,${this.alpha})`;
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particles.length = 0;
  const count = Math.max(12, PARTICLE_COUNT);
  for(let i=0;i<count;i++) particles.push(new Particle());
}
initParticles();

function animate(){
  ctx.clearRect(0,0,w,h);
  // subtle radial gradient overlay
  const g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0, "rgba(10,16,30,0.18)");
  g.addColorStop(1, "rgba(5,6,12,0.28)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for(let p of particles){
    p.update();
    p.draw();
  }

  // connect nearest
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if(d < 120){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(60,120,255,${(0.12*(1 - d/120)).toFixed(2)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

/* Handle resize */
window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  initParticles();
});

/* Prevent default cursor on desktop */
document.documentElement.style.cursor = 'none';