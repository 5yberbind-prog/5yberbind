// Scroll helper
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}

// Neon colour palettes
const palettes = [
  ['#00e6ff','#8a54ff','#00f39a'],
  ['#ff7aa2','#ffd166','#9b8cff'],
  ['#00f2b8','#47b8ff','#a05dff'],
  ['#ff9d00','#ff005c','#9000ff'],
  ['#29f19c','#00eaff','#ff6ac1']
];

let i = 0;

// Apply theme
function applyPalette(p){
  document.documentElement.style.setProperty('--neon-a', p[0]);
  document.documentElement.style.setProperty('--neon-b', p[1]);
  document.documentElement.style.setProperty('--neon-c', p[2]);
  document.documentElement.style.setProperty('--bg1', p[1] + "15");
  document.documentElement.style.setProperty('--bg2', p[2] + "10");
}

// Auto change every 5 seconds
setInterval(()=>{
  i = (i + 1) % palettes.length;
  applyPalette(palettes[i]);
}, 5000);

// Tap or click to change instantly
document.body.addEventListener('click', ()=>{
  i = (i + 1) % palettes.length;
  applyPalette(palettes[i]);
});

// On load random colour start
window.addEventListener('load', ()=>{
  i = Math.floor(Math.random() * palettes.length);
  applyPalette(palettes[i]);
});