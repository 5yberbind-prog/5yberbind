// Simple JS Animation
document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.background = window.scrollY > 50 ? "#000" : "#111";
});
// ==== Apps List Data ====
const apps = [
  {
    name: "Teen Patti Real",
    icon: "https://yourwebsite.com/assets/teenpatti.png", // अपनी image link डालें
    rating: "4.5",
    downloads: "320.7K",
    link: "https://github.com/USERNAME/REPO/releases/download/v1.0/teenpatti.apk"
  },
  {
    name: "Lucky 100",
    icon: "https://yourwebsite.com/assets/lucky100.png",
    rating: "4.3",
    downloads: "150K",
    link: "https://drive.google.com/uc?export=download&id=FILE_ID"
  }
];

// ==== Function to Display Cards ====
const container = document.getElementById("apps-container");
apps.forEach(app => {
  const card = document.createElement("div");
  card.classList.add("app-card");
  card.innerHTML = `
    <img src="${app.icon}" alt="${app.name}" class="app-icon">
    <h3>${app.name}</h3>
    <p>⭐ ${app.rating} | ${app.downloads} Downloads</p>
    <a href="${app.link}" class="download-btn" target="_blank">Download</a>
  `;
  container.appendChild(card);
});