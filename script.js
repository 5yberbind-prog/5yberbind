function filterCategory(cat) {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let c = cards[i].getAttribute("data-category");
    cards[i].style.display = (cat === "all" || c === cat) ? "block" : "none";
  }
}
<script>
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 300);
});
</script>