function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("hidden");
}

function downloadFile(url) {
  window.open(url, "_blank");
}

function openApp() {
  document.getElementById("appDetail").classList.remove("hidden");
}

function closeApp() {
  document.getElementById("appDetail").classList.add("hidden");
}

document.getElementById("themeSelect").addEventListener("change", function () {
  document.documentElement.className = this.value;
});