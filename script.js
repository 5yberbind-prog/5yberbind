function filterCategory(cat) {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let c = cards[i].getAttribute("data-category");
    cards[i].style.display = (cat === "all" || c === cat) ? "block" : "none";
  }
}