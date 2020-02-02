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
      getImages();

      return;
    }

    flipped = false;
    secondCard = this;
    getImages();
    checkMatch();
  }

  function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? removeClick() : unflip();
  }

  function removeClick() {
    console.log("ITS A MATCH");
    setTimeout(() => {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
      resetImages();
    },1500);
  }

  function unflip() {
    console.log("NO MATCH");
    locked = true;
    setTimeout(() => {
      firstCard.classList.toggle("flip");
      secondCard.classList.toggle("flip");
      resetBoard();
      resetImages();
    }, 1500);
  }

  function resetBoard() {
    flipped = false;
    locked = false;
    firstCard = null;
    secondCard = null;
  }

  function getImages() {
    firstCardBigImage.src = "assets/images/" + firstCard.dataset.framework + "-card.png";
    if (firstCard.dataset.framework === "jigglypuff" || firstCard.dataset.framework === "pikachu") {
      firstCardLogo.src = "assets/images/pokemon-logo.png";
    }
    else if (firstCard.dataset.framework === "mario" || firstCard.dataset.framework === "luigi") {
      firstCardLogo.src = "assets/images/mario-bros-logo.png";
    }
    else {
      firstCardLogo.src = "assets/images/" + firstCard.dataset.framework + "-logo.png";
      firstCardText.innerText = firstCard.dataset.framework;
    }
    if(secondCard === null) {
      return;
    }
    else {
      secondCardBigImage.src = "assets/images/" + secondCard.dataset.framework + "-card.png";
      if (secondCard.dataset.framework === "jigglypuff" || secondCard.dataset.framework === "pikachu") {
        secondCardLogo.src = "assets/images/pokemon-logo.png";
      }
      else if (secondCard.dataset.framework === "mario" || secondCard.dataset.framework === "luigi") {
        secondCardLogo.src = "assets/images/mario-bros-logo.png";
      }
      else {
        secondCardLogo.src = "assets/images/" + secondCard.dataset.framework + "-logo.png";
        secondCardText.innerText = secondCard.dataset.framework;
      }
    }
  }

  function resetImages() {
    firstCardBigImage.src = "assets/images/random.png";
    firstCardLogo.src = "assets/images/smash-icon.png";
    firstCardText.innerText = "Character";
    secondCardBigImage.src = "assets/images/random.png";
    secondCardLogo.src = "assets/images/smash-icon.png";
    secondCardText.innerText = "Character";
  }

});
