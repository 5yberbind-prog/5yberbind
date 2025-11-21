// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
    toggleBtn.innerText = document.body.classList.contains("dark")
        ? "Dark"
        : "Light";
};