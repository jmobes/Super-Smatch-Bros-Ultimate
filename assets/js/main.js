document.addEventListener("DOMContentLoaded", function() {

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  function flipCard() {
    const back = this.children[0];
    const front = this.children[1];
    back.classList.toggle("invisible");
    front.classList.toggle("visible");
  }

});
