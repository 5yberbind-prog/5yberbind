const btn = document.getElementById("themeToggle");

btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        document.body.style.background = "#111";
        document.body.style.color = "#fff";
        btn.innerText = "Dark";
    } else {
        document.body.style.background = "#fff";
        document.body.style.color = "#000";
        btn.innerText = "Light";
    }
};