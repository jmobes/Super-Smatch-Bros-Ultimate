document.addEventListener("DOMContentLoaded", function() {

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  function flipCard() {
    console.log(event.target);
  }

});
