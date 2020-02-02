document.addEventListener("DOMContentLoaded", function() {

  let firstCard = null;
  let secondCard = null;
  let flipped = false;
  let locked = false;
  let match = 0;

  const firstCardBigImage = document.querySelector(".first-pick-character");
  const secondCardBigImage = document.querySelector(".second-pick-character");
  const firstCardLogo = document.querySelector(".first-pick-logo");
  const secondCardLogo = document.querySelector(".second-pick-logo");
  const firstCardText = document.querySelector(".first-card-text");
  const secondCardText = document.querySelector(".second-card-text");

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
      firstCardBigImage.src = "assets/images/" + firstCard.dataset.framework + "-card.png";
      firstCardLogo.src = "assets/images/" + firstCard.dataset.framework + "-logo.png";
      firstCardText.innerText = firstCard.dataset.framework;

      return;
    }

    flipped = false;
    secondCard = this;
    secondCardBigImage.src = "assets/images/" + secondCard.dataset.framework + "-card.png";
    secondCardLogo.src = "assets/images/" + secondCard.dataset.framework + "-logo.png";
    secondCardText.innerText = secondCard.dataset.framework;
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
