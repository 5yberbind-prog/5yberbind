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