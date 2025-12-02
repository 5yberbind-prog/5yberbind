const apps = [
    { title: "PhotoEditor Pro", img: "assets/thumb_1.png", desc: "Advanced Image Editor", link: "downloads/app1.zip" },
    { title: "VideoMaster X", img: "assets/thumb_2.png", desc: "Video Editing App", link: "downloads/app2.zip" },
    { title: "FontPack 500", img: "assets/thumb_3.png", desc: "500 Fonts Collection", link: "downloads/app3.zip" }
];

const templates = [
    { title: "Template 1", img: "assets/thumb_4.png", link: "downloads/template1.zip" },
    { title: "Template 2", img: "assets/thumb_5.png", link: "downloads/template2.zip" },
    { title: "Template 3", img: "assets/thumb_6.png", link: "downloads/template3.zip" }
];

const blogs = [
    { title: "How to Edit XML Files", img: "assets/thumb_7.png", desc: "Step-by-step complete guide" },
    { title: "Create Viral Shorts", img: "assets/thumb_8.png", desc: "Tricks for trending videos" },
    { title: "Website UI Design", img: "assets/thumb_9.png", desc: "Pro layout designing tips" }
];

function loadCards(data, containerId) {
    const box = document.getElementById(containerId);
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.img}">
            <div class="card-title">${item.title}</div>
            <div class="card-desc">${item.desc || "Download Now"}</div>
            ${item.link ? `<a class="card-btn" href="${item.link}">Download</a>` : ""}
        `;

        box.appendChild(card);
    });
}

loadCards(apps, "apps-container");
loadCards(templates, "templates-container");
loadCards(blogs, "blogs-container");