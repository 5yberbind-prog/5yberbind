const apps = [
  {
    name: "Teen Patti Real",
    icon: "assets/icons/teenpatti.png",
    link: "https://github.com/USERNAME/REPO/releases/download/v1.0/teenpatti.apk"
  },
  {
    name: "Lucky 100",
    icon: "assets/icons/lucky100.png",
    link: "https://drive.google.com/uc?export=download&id=FILE_ID"
  }
];

const container = document.getElementById("apps-container");
apps.forEach(app => {
  const card = document.createElement("div");
  card.classList.add("app-card");
  card.innerHTML = `
    <img src="${app.icon}" alt="${app.name}" class="app-icon">
    <h3>${app.name}</h3>
    <a href="${app.link}" class="download-btn" target="_blank">Download</a>
  `;
  container.appendChild(card);
});document.querySelectorAll('a, button').forEach(btn => {
  btn.addEventListener('click', function(e) {