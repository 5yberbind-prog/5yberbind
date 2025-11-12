// === Dynamic daily colors ===
const day = new Date().getDay();
const palettes = [
  { a: "#140030", b: "#002060", neon: "#9b66ff" }, // Mon - purple
  { a: "#001520", b: "#002f3b", neon: "#00e6ff" }, // Tue - cyan
  { a: "#001909", b: "#004b20", neon: "#00ff9f" }, // Wed - green
  { a: "#2a0b00", b: "#3b1a00", neon: "#ff9f1c" }, // Thu - orange
  { a: "#2b0010", b: "#550020", neon: "#ff4f8b" }, // Fri - pink-red
  { a: "#000d20", b: "#1a0030", neon: "#00ffff" }, // Sat - aqua
  { a: "#00102b", b: "#332b00", neon: "#ffd23f" }  // Sun - gold
];
const p = palettes[day];
document.body.style.background = `linear-gradient(135deg, ${p.a}, ${p.b})`;

// === Apply neon color dynamically ===
document.querySelector(":root").style.setProperty("--accent", p.neon);

// === Menu open/close ===
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const side = document.getElementById('sideMenu');
openBtn.onclick = (e) => { e.stopPropagation(); side.classList.add('open'); };
closeBtn.onclick = () => side.classList.remove('open');
document.addEventListener('click', e => {
  if (!side.contains(e.target) && !openBtn.contains(e.target)) side.classList.remove('open');
});

// === Subscribe popup ===
const popup = document.getElementById('subscribePopup');
setTimeout(() => popup.classList.add('show'), 4000);
document.getElementById('closePopup').onclick = () => popup.classList.remove('show');

// === Particles animation ===
const c = document.getElementById('bgCanvas'), ctx = c.getContext('2d');
let w = c.width = innerWidth, h = c.height = innerHeight;
const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 3 + 1,
  vx: Math.random() * 0.6 - 0.3,
  vy: Math.random() * 0.6 - 0.3
}));

function draw() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(pt => {
    ctx.beginPath();
    ctx.fillStyle = `${p.neon}22`;
    ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
    ctx.fill();
    pt.x += pt.vx; pt.y += pt.vy;
    if (pt.x < 0) pt.x = w; if (pt.x > w) pt.x = 0;
    if (pt.y < 0) pt.y = h; if (pt.y > h) pt.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();
window.onresize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };

// === Mouse trail effect ===
const trail = document.getElementById('cursorTrail');
const dots = Array.from({ length: 8 }, () => {
  const d = document.createElement('div');
  d.style.width = '8px'; d.style.height = '8px';
  d.style.borderRadius = '50%';
  d.style.background = p.neon;
  d.style.opacity = '0.15';
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

// === Button animation ===
document.querySelectorAll('.download').forEach(btn => {
  btn.addEventListener('click', e => {
    if (btn.getAttribute('href') === '#') {
      e.preventDefault();
      btn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
        { duration: 400 }
      );
    }
  });
});