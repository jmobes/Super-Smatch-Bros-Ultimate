document.addEventListener("DOMContentLoaded", function() {

  let firstCard = null;
  let secondCard = null;
  let flipped = false;
  let locked = false;
  let match = 0;

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  function flipCard() {

    if (locked) {
      return;
    }

    if (this === firstCard) {
      console.log("cant click on same card");
      return;
    }

    this.classList.toggle("flip");

    if(!flipped) {
      flipped = true;
      firstCard = this;
      return;
    }

    flipped = false;
    secondCard = this;
    checkMatch();
  }

  function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? removeClick() : unflip();
  }

  function removeClick() {
    console.log("ITS A MATCH");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  function unflip() {
    console.log("NO MATCH");
    locked = true;
    setTimeout(() => {
      firstCard.classList.toggle("flip");
      secondCard.classList.toggle("flip");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    flipped = false;
    locked = false;
    firstCard = null;
    secondCard = null;
  }

});
