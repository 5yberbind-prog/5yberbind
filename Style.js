async function loadData(){
  let res = await fetch("data/items.json");
  return await res.json();
}

function card(item){
  return `
    <div class="card">
      <img src="${item.thumbnail}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a class="btn-primary" href="${item.file}" download>Download</a>
    </div>
  `;
}

async function render(){
  let data = await loadData();

  document.querySelector("#featuredGrid").innerHTML =
    data.slice(0,3).map(card).join("");

  document.querySelector("#galleryGrid").innerHTML =
    data.map(card).join("");
}

render();
