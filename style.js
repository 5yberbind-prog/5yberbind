/* PREMIUM SMOOTH CURSOR + TRAIL + CLICK RIPPLE
   - high-performance: uses object pooling for trail dots
   - smooth follower using lerp with requestAnimationFrame
   - auto-disabled on touch / reduced-motion
*/

/* ---- DARK MODE TOGGLE ---- */

const html = document.documentElement;
const darkBtn = document.querySelector('#darkToggle');

// Load saved theme
const savedTheme = localStorage.getItem('5y-theme');
if (savedTheme === 'dark') {
    html.classList.add('dark');
}
if (savedTheme === 'light') {
    html.classList.remove('dark');
}

// Button click event
if (darkBtn) {
    darkBtn.addEventListener('click', () => {
        html.classList.toggle('dark');

        // Save preference
        localStorage.setItem(
            '5y-theme',
            html.classList.contains('dark') ? 'dark' : 'light'
        );

        // Small button animation
        darkBtn.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.25)' },
                { transform: 'scale(1)' }
            ],
            { duration: 250 }
        );
    });
} else {
    console.log("Dark mode button not found: #darkToggle");
}
(() => {
  const doc = document;
  const html = doc.documentElement;

  // respect reduced-motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (reduced || isTouch) return; // do nothing on touch or reduce-motion

  // create cursor follower element
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  follower.innerHTML = '<div class="cursor-ring"></div>';
  document.body.appendChild(follower);
  // enable visible
  follower.style.display = 'block';
  follower.style.opacity = '1';

  // pointer state
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let fx = mouseX, fy = mouseY; // follower position (smoothed)
  const ease = 0.18; // smoothing factor (smaller = smoother/slower)
  let lastMoveTime = Date.now();

  // trail pooling
  const POOL_SIZE = 28;
  const pool = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const el = document.createElement('div');
    el.className = 'trail-dot';
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    el.style.top = '-9999px';
    el.style.opacity = '0';
    document.body.appendChild(el);
    pool.push({el, busy: false});
  }
  let poolIdx = 0;
  function getDot() {
    for (let i = 0; i < POOL_SIZE; i++) {
      poolIdx = (poolIdx + 1) % POOL_SIZE;
      if (!pool[poolIdx].busy) {
        pool[poolIdx].busy = true;
        return pool[poolIdx];
      }
    }
    // fallback: reuse current
    poolIdx = (poolIdx + 1) % POOL_SIZE;
    return pool[poolIdx];
  }

  // mousemove -> update mouseX/mouseY and spawn subtle trailing dots
  let lastDot = 0;
  const DOT_INTERVAL = 22; // ms between spawning dots
  doc.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    lastMoveTime = Date.now();

    // spawn dot at intervals for smooth trail
    const now = Date.now();
    if (now - lastDot > DOT_INTERVAL) {
      spawnTrailDot(mouseX, mouseY);
      lastDot = now;
    }
  }, {passive:true});

  // spawn a pooled trail dot
  function spawnTrailDot(x, y) {
    const p = getDot();
    const el = p.el;
    // slight randomization
    const sRand = (Math.random() * 0.6) - 0.3;
    const sizeClass = (Math.random() > 0.7) ? ' small' : '';
    el.className = 'trail-dot' + sizeClass;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.opacity = '1';
    el.style.transform = 'translate(-50%,-50%) scale(1)';
    // release after animation duration
    setTimeout(() => {
      el.style.left = '-9999px';
      el.style.top = '-9999px';
      p.busy = false;
      el.className = 'trail-dot'; // reset
    }, 760); // slight buffer over CSS animation time
  }

  // click ripple
  doc.addEventListener('click', (e) => {
    // small click feedback on follower
    follower.classList.add('grow');
    setTimeout(()=> follower.classList.remove('grow'), 180);

    // ripple element
    const r = document.createElement('div');
    r.className = 'click-ripple';
    r.style.left = (e.clientX) + 'px';
    r.style.top = (e.clientY) + 'px';
    document.body.appendChild(r);
    setTimeout(()=> { r.remove(); }, 620);
  }, {passive:true});

  // enlarge follower on interactive elements
  const interactive = 'a, button, .card, .card-btn, .download-btn, input, textarea, label';
  doc.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('grow'));
    el.addEventListener('mouseleave', () => follower.classList.remove('grow'));
  });

  // smooth follow using rAF
  function animate() {
    // lerp follower towards mouse
    fx += (mouseX - fx) * ease;
    fy += (mouseY - fy) * ease;
    follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%) scale(1)`;
    requestAnimationFrame(animate);
  }
  animate();

  // optional: subtle idle fade when mouse not moved recently
  setInterval(() => {
    const idle = (Date.now() - lastMoveTime) > 2200;
    follower.style.opacity = idle ? '0.16' : '1';
  }, 600);

})();