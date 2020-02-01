document.addEventListener("DOMContentLoaded", function() {

  let firstCard = null;
  let secondCard = null;
  let flipped = false;
  let match = 0;

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  function flipCard() {

    console.log("Event Fired");

    const back = this.children[0];
    const front = this.children[1];

    back.classList.toggle("invisible");
    front.classList.toggle("visible");

    if(!flipped) {
      flipped = true;
      firstCard = front;
      console.log(this);
    }
    else {
      flipped = false;
      secondCard = front;
      console.log(this);

      if (firstCard.getAttributeNode("src").value === secondCard.getAttributeNode("src").value) {
        console.log("ITS A MATCH");
        match++;
      }
    }

  }

});
