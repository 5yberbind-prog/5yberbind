// Gentle parallax + shooting star logic
(() => {
  const layers = document.querySelectorAll('#calmUniverse .layer');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    layers.forEach((layer, i) => {
      const depth = (i + 1) * 2;
      layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    layers.forEach((layer, i) => {
      const offset = scrollY / (30 + i * 10);
      layer.style.transform = `translateY(${offset}px)`;
    });
  });

  // Shooting star logic
  const rand = (min, max) => Math.random() * (max - min) + min;
  function spawnStar() {
    const s = document.createElement('div');
    s.className = 'shooting-star';
    const startX = rand(-0.2, 0.3) * innerWidth;
    const startY = rand(0.05, 0.45) * innerHeight;
    const angle = rand(18, 38);
    const travel = rand(0.6, 1.6) * Math.max(innerWidth, innerHeight);
    const dur = rand(900, 1500);
    s.style.left = `${startX}px`;
    s.style.top = `${startY}px`;
    s.style.transform = `rotate(${angle}deg)`;
    document.body.appendChild(s);

    const start = performance.now();
    const rad = angle * Math.PI / 180;
    const vx = Math.cos(rad) * (travel / dur);
    const vy = Math.sin(rad) * (travel / dur);

    function step(now) {
      const t = (now - start) / dur;
      if (t >= 1) return s.remove();
      const curX = startX + vx * (now - start);
      const curY = startY + vy * (now - start);
      s.style.transform = `translate3d(${curX}px, ${curY}px,0) rotate(${angle}deg)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    s.style.animation = `starMove ${dur}ms linear`;
  }
  function loop() {
    const time = rand(8000, 16000);
    setTimeout(() => {
      spawnStar();
      if (Math.random() < 0.25) setTimeout(spawnStar, rand(150, 500));
      loop();
    }, time);
  }
  setTimeout(loop, 2000);
})();