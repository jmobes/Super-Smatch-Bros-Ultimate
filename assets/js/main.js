document.addEventListener("DOMContentLoaded", function() {
  const winCondition = 12;

  let firstCard = null;
  let secondCard = null;
  let flipped = false;
  let locked = false;
  let match = 0;

  let characterSound = new Audio();
  let musicOn = false;

  const firstCardBigImage = document.querySelector(".first-pick-character");
  const secondCardBigImage = document.querySelector(".second-pick-character");
  const firstCardLogo = document.querySelector(".first-pick-logo");
  const secondCardLogo = document.querySelector(".second-pick-logo");
  const firstCardText = document.querySelector(".first-card-text");
  const secondCardText = document.querySelector(".second-card-text");

  const soundBtn = document.querySelector(".sound");
  soundBtn.addEventListener("click", toggleMusic);


  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  // shuffleCards();

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
      playSound();
      return;
    }

    flipped = false;
    secondCard = this;
    getImages();
    playSound();
    checkMatch();
  }

  function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? removeClick() : unflip();
  }

  function removeClick() {
    match++;
    locked = true;
    setTimeout(() => {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
      resetImages();
    },1000);
    if(match === winCondition) {
      displayModal();
    }
  }

  function unflip() {
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

    if(firstCardBigImage.src && flipped) {
      firstCardBigImage.src = "assets/images/" + firstCard.dataset.framework + "-card.png";

      if (firstCard.dataset.framework === "jigglypuff" || firstCard.dataset.framework === "pikachu") {
        firstCardLogo.src = "assets/images/pokemon-logo.png";
      }
      else if (firstCard.dataset.framework === "mario" || firstCard.dataset.framework === "luigi") {
        firstCardLogo.src = "assets/images/mario-bros-logo.png";
      }
      else {
        firstCardLogo.src = "assets/images/" + firstCard.dataset.framework + "-logo.png";
      }

      if (firstCard.dataset.framework === "falcon") {
        firstCardText.innerText = "C. Falcon";
      }
      else if (firstCard.dataset.framework === "dK") {
        firstCardText.innerText = "Donkey Kong";
      }
      else {
        firstCardText.innerText = firstCard.dataset.framework;
      }

      firstCardText.style.textTransform = "capitalize";

      return;
    }

    secondCardBigImage.src = "assets/images/" + secondCard.dataset.framework + "-card.png";

    if (secondCard.dataset.framework === "jigglypuff" || secondCard.dataset.framework === "pikachu") {
      secondCardLogo.src = "assets/images/pokemon-logo.png";
    }
    else if (secondCard.dataset.framework === "mario" || secondCard.dataset.framework === "luigi") {
      secondCardLogo.src = "assets/images/mario-bros-logo.png";
    }
    else {
      secondCardLogo.src = "assets/images/" + secondCard.dataset.framework + "-logo.png";
    }
    if (secondCard.dataset.framework === "falcon") {
      secondCardText.innerText = "C. Falcon";
    }
    else if (secondCard.dataset.framework === "dK") {
      secondCardText.innerText = "Donkey Kong";
    }
    else {
      secondCardText.innerText = secondCard.dataset.framework;
    }
    secondCardText.style.textTransform = "capitalize";
  }

  function resetImages() {
    firstCardBigImage.src = "assets/images/random.png";
    firstCardLogo.src = "assets/images/smash-icon.png";
    firstCardText.innerText = "Fighter";
    secondCardBigImage.src = "assets/images/random.png";
    secondCardLogo.src = "assets/images/smash-icon.png";
    secondCardText.innerText = "Fighter";
  }

  function shuffleCards() {
    cards.forEach(card=>{
      let randomPosition = Math.floor(Math.random()*24);
      card.style.order = randomPosition;
    })
  }

  function playSound() {
    if(!musicOn) {
      return;
    }

    if(flipped) {
      switchSound(firstCard);
      return;
    }
      switchSound(secondCard);
  }

  function switchSound(character) {
    switch (character.dataset.framework) {
      case "mario":
        characterSound.src = "assets/audio/mario.wav";
        break;
      case "dK":
        characterSound.src = "assets/audio/dK.wav";
        break;
      case "link":
        characterSound.src = "assets/audio/link.wav";
        break;
      case "samus":
        characterSound.src = "assets/audio/samus.wav";
        break;
      case "yoshi":
        characterSound.src = "assets/audio/yoshi.wav";
        break;
      case "kirby":
        characterSound.src = "assets/audio/kirby.wav";
        break;
      case "fox":
        characterSound.src = "assets/audio/fox.wav";
        break;
      case "pikachu":
        characterSound.src = "assets/audio/pikachu.wav";
        break;
      case "luigi":
        characterSound.src = "assets/audio/luigi.wav";
        break;
      case "ness":
        characterSound.src = "assets/audio/ness.wav";
        break;
      case "falcon":
        characterSound.src = "assets/audio/falcon.wav";
        break;
      case "jigglypuff":
        characterSound.src = "assets/audio/jigglypuff.wav";
    }
    characterSound.play();
  }

  function displayModal() {
    document.querySelector(".modal-container").style.display = "block";
  }

  function toggleMusic() {
    const themeMusic = document.querySelector(".theme-music");

    const muted = document.querySelector(".muted");
    const unmuted = document.querySelector(".unmuted");
    muted.classList.toggle("toggleIcon");
    unmuted.classList.toggle("toggleIcon");

    if(muted.classList.contains("toggleIcon")) {
      musicOn = true;
      themeMusic.play();
    }
    else {
      musicOn = false;
      themeMusic.pause();
    }
  }

});
