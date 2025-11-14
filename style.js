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