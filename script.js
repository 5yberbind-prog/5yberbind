function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}

const palettes = [
  ['#00e6ff','#8a54ff','#00f39a'],
  ['#ff7aa2','#ffd166','#9b8cff'],
  ['#00f2b8','#47b8ff','#a05dff'],
  ['#ff9d00','#ff005c','#9000ff'],
  ['#29f19c','#00eaff','#ff6ac1'],
  ['#8affff','#a09fff','#ff7adf']
];

let i = 0;
function applyPalette(p){
  document.documentElement.style.setProperty('--neon-a', p[0]);
  document.documentElement.style.setProperty('--neon-b', p[1]);
  document.documentElement.style.setProperty('--neon-c', p[2]);
}

// Smooth infinite transition every 10 seconds
setInterval(()=>{
  i = (i + 1) % palettes.length;
  applyPalette(palettes[i]);
}, 10000);

// Tap or click instantly change
document.body.addEventListener('click', ()=>{
  i = (i + 1) % palettes.length;
  applyPalette(palettes[i]);
});

// Start random color
window.addEventListener('load', ()=>{
  i = Math.floor(Math.random() * palettes.length);
  applyPalette(palettes[i]);
});
// Neon Click Pop Animation
function addGlowEffect(el) {
  if (!el.classList.contains('click-glow')) return;
  el.classList.add('active');
  el.classList.add('pop-effect');
  setTimeout(() => {
    el.classList.remove('active');
    el.classList.remove('pop-effect');
  }, 700);
}

// Add effect to all clickable elements
document.querySelectorAll('.btn, .card, .click-glow').forEach(el => {
  el.classList.add('click-glow');
  el.addEventListener('click', (e) => addGlowEffect(el));
});
// Neon click pop effect
function addGlow(el){
  if(!el.classList.contains('click-glow'))return;
  el.classList.add('active','pop-effect');
  setTimeout(()=>{el.classList.remove('active','pop-effect');},700);
}
document.querySelectorAll('.btn,.card').forEach(el=>{
  el.classList.add('click-glow');
  el.addEventListener('click',()=>addGlow(el));
});
.section h2:hover {
  text-shadow: 0 0 15px var(--neon1), 0 0 25px var(--neon2);
  transition: text-shadow 0.4s ease-in-out;
}
// === Neon Parallax Light Follow Effect ===
const parallaxLayers = document.createElement('div');
parallaxLayers.className = 'parallax-layer';
document.body.appendChild(parallaxLayers);

// Create soft moving circles (react to cursor)
for (let i = 0; i < 8; i++) {
  const particle = document.createElement('div');
  particle.classList.add('neon-particle');
  particle.style.setProperty('--x', Math.random() * 100 + '%');
  particle.style.setProperty('--y', Math.random() * 100 + '%');
  parallaxLayers.appendChild(particle);
}

// Parallax motion
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  parallaxLayers.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
});

// Mobile touch move support
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const x = (touch.clientX / window.innerWidth - 0.5) * 2;
  const y = (touch.clientY / window.innerHeight - 0.5) * 2;
  parallaxLayers.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
});
window.addEventListener('scroll', () => {
  if (window.scrollY > document.body.scrollHeight * 0.7) {
    popup.classList.add("active");
  }
});