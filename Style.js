async function loadData(){
  const res = await fetch("data/items.json");
  return await res.json();
}

function card(item){
  return `
    <div class="cat-box">
      <img src="${item.thumbnail}">
      <h3>${item.title}</h3>
    </div>`;
}

async function render(){
  let data = await loadData();
  document.querySelector("#galleryGrid").innerHTML =
    data.map(card).join("");
}
render();
