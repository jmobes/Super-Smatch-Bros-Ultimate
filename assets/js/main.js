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
    let back = this.children[0];
    let front = this.children[1];

    if (locked) {
      return;
    }

    if(this === firstCard) {
      return;
    }

    back.classList.toggle("invisible");
    front.classList.toggle("visible");

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
    locked = true;
    setTimeout(() => {
      firstCard.children[0].classList.toggle("invisible");
      firstCard.children[1].classList.toggle("visible");
      secondCard.children[0].classList.toggle("invisible");
      secondCard.children[1].classList.toggle("visible");

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
