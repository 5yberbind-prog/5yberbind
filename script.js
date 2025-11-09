// Simple JS Animation
document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.background = window.scrollY > 50 ? "#000" : "#111";
});