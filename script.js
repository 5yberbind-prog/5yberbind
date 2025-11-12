// === Fixed Premium Color Theme ===
const theme = {
  bg1: "#01040a",
  bg2: "#001520",
  neon: "#00e6ff",
  gold: "#ffd23f"
};

// === Apply fixed background and neon ===
document.body.style.background = `linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`;
document.querySelector(":root").style.setProperty("--accent", theme.neon);

// === MENU OPEN/CLOSE ===
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const side = document.getElementById('sideMenu');

openBtn.onclick = (e) => { e.stopPropagation(); side.classList.add('open'); };
closeBtn.onclick = () => side.classList.remove('open');
document.addEventListener('click', e => {
  if (!side.contains(e.target) && !openBtn.contains(e.target))
    side.classList.remove('open');
});

// === SUBSCRIBE POPUP ===
const popup = document.getElementById('subscribePopup');
setTimeout(() => popup.classList.add('show'), 4000);
document.getElementById('closePopup').onclick = () => popup.classList.remove('show');

// === PARTICLES ===
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
  particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = `${theme.neon}22`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();
window.onresize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };

// === MOUSE TRAIL ===
const trail = document.getElementById('cursorTrail');
const dots = Array.from({ length: 8 }, () => {
  const d = document.createElement('div');
  d.style.width = '8px'; d.style.height = '8px';
  d.style.borderRadius = '50%';
  d.style.background = theme.neon;
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

// === DOWNLOAD BUTTON EFFECT ===
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