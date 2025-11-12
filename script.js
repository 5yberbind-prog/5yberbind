// === Fixed Orange Cyber Theme ===
const theme = {
  neon: "#ff6600",
  bg1: "#0b0b0b",
  bg2: "#000000"
};

document.body.style.background = `linear-gradient(180deg, ${theme.bg1}, ${theme.bg2})`;

// === MENU ===
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const side = document.getElementById("sideMenu");

openBtn.onclick = (e) => { e.stopPropagation(); side.classList.add("open"); };
closeBtn.onclick = () => side.classList.remove("open");
document.addEventListener("click", (e) => {
  if (!side.contains(e.target) && !openBtn.contains(e.target)) side.classList.remove("open");
});

// === PARTICLES ===
const c = document.getElementById("bgCanvas");
const ctx = c.getContext("2d");
let w = c.width = innerWidth;
let h = c.height = innerHeight;
const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 3 + 1,
  vx: Math.random() * 0.6 - 0.3,
  vy: Math.random() * 0.6 - 0.3
}));
function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `${theme.neon}33`;
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = theme.neon;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();
window.onresize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };

// === MOUSE TRAIL ===
const trail = document.getElementById("cursorTrail");
const dots = Array.from({ length: 10 }, () => {
  const d = document.createElement("div");
  d.style.width = "10px";
  d.style.height = "10px";
  d.style.background = theme.neon;
  d.style.opacity = "0.12";
  d.style.boxShadow = `0 0 20px ${theme.neon}`;
  trail.appendChild(d);
  return { el: d, x: 0, y: 0 };
});
let mouse = { x: 0, y: 0 };
window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
function animateTrail() {
  let x = mouse.x, y = mouse.y;
  dots.forEach((d, i) => {
    d.x += (x - d.x) * (0.2 + i * 0.02);
    d.y += (y - d.y) * (0.2 + i * 0.02);
    d.el.style.transform = `translate(${d.x}px,${d.y}px)`;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();