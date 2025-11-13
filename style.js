/* Replace old script.js with this whole file */
/* Dark mode toggle (stores preference in localStorage) */
(function(){
  const html = document.documentElement;
  const btns = document.querySelectorAll('#darkToggle');
  const CURSOR = { enabled: false };

  // apply saved theme
  const saved = localStorage.getItem('5y-theme');
  if(saved === 'dark') html.classList.add('dark');

  btns.forEach(b=>{
    b.addEventListener('click', ()=>{
      html.classList.toggle('dark');
      localStorage.setItem('5y-theme', html.classList.contains('dark') ? 'dark' : 'light');
      // small button feedback
      b.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}], {duration:220});
    });
  });

  // Cursor follower for non-touch devices
  function isTouch(){ return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
  if(!isTouch()){
    CURSOR.enabled = true;
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    follower.style.display = 'block';
    let mouseX=0, mouseY=0, fx=0, fy=0;
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      follower.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });
    // enlarge on hover for interactive items
    document.querySelectorAll('a, button, .card, .card-btn, .download-btn').forEach(el=>{
      el.addEventListener('mouseenter', ()=> follower.style.transform += ' scale(1.5)');
      el.addEventListener('mouseleave', ()=> follower.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`);
    });
  }

  // Simple reveal on scroll
  const revealElems = document.querySelectorAll('.card, .download-card, .hero, .page-header');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.style.transform = 'translateY(0)'; 
    });
  }, {threshold:0.12});
  revealElems.forEach(el=>{
    el.style.transition = 'transform 600ms cubic-bezier(.2,.9,.3,1), opacity 600ms';
    el.style.transform = 'translateY(18px)';
    el.style.opacity = '1';
    io.observe(el);
  });

  // small tilt effect for cards on mousemove
  document.querySelectorAll('.card, .download-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (r.width/2);
      const dy = (e.clientY - cy) / (r.height/2);
      card.style.transform = `perspective(900px) rotateX(${(-dy*4).toFixed(2)}deg) rotateY(${(dx*4).toFixed(2)}deg) translateZ(0) scale(1.01)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });

})();
/* Neon click ripple + cursor boost */
document.addEventListener("click", function(e) {
    // Neon ripple
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);

    // remove ripple after animation
    setTimeout(() => ripple.remove(), 600);

    // Boost cursor glow effect
    const cf = document.querySelector(".cursor-follower");
    if (cf) {
        cf.classList.add("click-boost");
        setTimeout(() => cf.classList.remove("click-boost"), 200);
    }
});
/* Neon cursor trail particles */
document.addEventListener("mousemove", function(e) {
    // make dot
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    document.body.appendChild(dot);

    // remove after animation
    setTimeout(() => dot.remove(), 800);
});