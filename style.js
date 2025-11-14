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
<script>
(function(){
  // If a previous cursor script exists, remove/disable it first.
  // This script creates smooth lerp motion and outlines on hover of .card / .app elements

  // Elements
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');

  // Smooth follow (lerp)
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let outlineX = mouseX, outlineY = mouseY;

  // target outline rect (when hovering)
  let targetRect = null;
  let isActive = false;

  // easing
  const ease = 0.18;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // show dot if hidden
    dot.style.opacity = 1;
  });

  // hide on leave
  window.addEventListener('mouseleave', ()=> {
    dot.style.opacity = 0;
    outline.style.opacity = 0;
  });

  // Update loop
  function raf(){
    // lerp dot
    dotX += (mouseX - dotX) * 0.28;
    dotY += (mouseY - dotY) * 0.28;
    dot.style.transform = `translate(${dotX - 0}px, ${dotY - 0}px) translate(-50%,-50%)`;

    // outline movement
    if(targetRect && isActive){
      // target center
      const tx = targetRect.left + targetRect.width / 2;
      const ty = targetRect.top + targetRect.height / 2;

      outlineX += (tx - outlineX) * ease;
      outlineY += (ty - outlineY) * ease;

      // lerp width/height
      const currentW = parseFloat(outline.style.width) || targetRect.width;
      const currentH = parseFloat(outline.style.height) || targetRect.height;
      const newW = currentW + (targetRect.width - currentW) * ease;
      const newH = currentH + (targetRect.height - currentH) * ease;

      outline.style.width = `${Math.round(newW)}px`;
      outline.style.height = `${Math.round(newH)}px`;
      outline.style.left = `${Math.round(outlineX)}px`;
      outline.style.top = `${Math.round(outlineY)}px`;
      // adjust radius to look premium
      outline.style.borderRadius = (Math.min(targetRect.width, targetRect.height) * 0.12) + 'px';

    } else {
      // follow small with mouse when not active (subtle)
      outlineX += (mouseX - outlineX) * (ease * 0.8);
      outlineY += (mouseY - outlineY) * (ease * 0.8);
      outline.style.left = `${Math.round(outlineX)}px`;
      outline.style.top = `${Math.round(outlineY)}px`;
      outline.style.width = `60px`;
      outline.style.height = `40px`;
      outline.style.borderRadius = '12px';
      outline.style.opacity = 0; // keep not visible if not active
    }

    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Helper: set outline to element rect
  function setOutlineRect(el){
    const r = el.getBoundingClientRect();
    targetRect = {
      left: r.left + window.scrollX + r.width/2 - r.width/2,
      top: r.top + window.scrollY,
      width: r.width,
      height: r.height
    };
    // center coords used in raf calculation (we store left+half in targetRect later)
    // We'll override in raf calculation
  }

  // Attach hover listeners to targets
  function bindTargets(selector){
    document.querySelectorAll(selector).forEach(el=>{
      el.addEventListener('mouseenter', (ev)=>{
        isActive = true;
        setOutlineRect(el);
        // set outline immediately to element center for fast response
        const r = el.getBoundingClientRect();
        outline.style.width = `${Math.round(r.width)}px`;
        outline.style.height = `${Math.round(r.height)}px`;
        outline.style.left = `${Math.round(r.left + r.width/2)}px`;
        outline.style.top = `${Math.round(r.top + r.height/2)}px`;
        outline.classList.add('active');
        // optional: slightly enlarge dot
        dot.style.transform = `translate(${r.left + r.width/2}px, ${r.top + r.height/2}px) translate(-50%,-50%) scale(0.85)`;
      });

      el.addEventListener('mousemove', (ev)=>{
        // update rect on resize/scroll/position change
        setOutlineRect(el);
      });

      el.addEventListener('mouseleave', ()=>{
        isActive = false;
        targetRect = null;
        outline.classList.remove('active');
        // small fade out
        outline.style.opacity = 0;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%) scale(1)`;
      });
    });
  }

  // apply to both large feature cards and small app cards
  bindTargets('.card');
  bindTargets('.app');
  bindTargets('.app-card'); // in case your other markup uses .app-card

  // Recalculate on resize to keep layout correct
  window.addEventListener('resize', ()=>{
    // nothing heavy, refs updated on mouseenter/mousemove
  });
})();
</script>
   