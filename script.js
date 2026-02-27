function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}
// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    
    if(document.body.classList.contains("light-mode")){
        toggleBtn.innerHTML = "☀️";
    } else {
        toggleBtn.innerHTML = "🌙";
    }
});