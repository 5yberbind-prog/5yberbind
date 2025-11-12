<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>5yberBind</title>
<style>
body {
  margin: 0;
  font-family: Poppins, sans-serif;
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
  background: #000;
  border-bottom: 2px solid #ffbf00;
}
header h1 {
  font-size: 22px;
  color: #ffbf00;
}

/* Neon Menu Button */
.menu-btn {
  width: 40px;
  height: 40px;
  background: cyan;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 20px cyan;
  transition: 0.3s;
}
.menu-btn:hover {
  box-shadow: 0 0 30px cyan;
}
.menu-btn span {
  font-size: 28px;
  color: black;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 60px;
  right: 20px;
  width: 220px;
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid #ffbf00;
  border-radius: 10px;
  box-shadow: 0 0 20px #ffbf00;
  display: none;
  flex-direction: column;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.sidebar.active {
  display: flex;
}

.sidebar a {
  color: #fff;
  padding: 12px 15px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}
.sidebar a:hover {
  background: #ffbf00;
  color: #000;
}

/* Close Button */
.close-btn {
  align-self: flex-end;
  background: red;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 14px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
</head>
<body>

<header>
  <h1>5yberBind</h1>
  <div class="menu-btn" id="menuBtn"><span>≡</span></div>
</header>

<div class="sidebar" id="sidebar">
  <div class="close-btn" id="closeBtn">✕ Close</div>
  <a href="#">🏠 Home</a>
  <a href="#">🎮 Gaming Tools</a>
  <a href="#">🧩 Editing Packs</a>
  <a href="#">🛠 Utility Apps</a>
  <a href="#">💰 Earning Tools</a>
  <a href="#">🎧 Music Tools</a>
  <a href="#">📞 Contact</a>
</div>

<main style="padding:40px; text-align:center;">
  <h2>Welcome to <span style="color:#ffbf00;">5yberBind</span></h2>
  <p>Your ultimate hub for Tech Apps, Editing Packs & Online Tools 🚀</p>
</main>

<script>
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});
</script>

</body>
</html>