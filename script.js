function openPreview(img) {
    document.getElementById("previewImg").src = img;
    document.getElementById("previewModal").style.display = "flex";
}

function closePreview() {
    document.getElementById("previewModal").style.display = "none";
}

document.getElementById("themeToggle").onclick = function () {
    document.body.classList.toggle("dark-theme");
    this.textContent = document.body.classList.contains("dark-theme") ? "Dark" : "Light";
};