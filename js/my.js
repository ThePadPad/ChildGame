const cards = document.querySelectorAll('.memory-card');

/**
* @type {Variable}
*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer = 0;

/**
* Funktion zum Umdrehen der Karte
*/
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
/**
* Prüfen, ob die zweite Karte mit der ersten Karte übereinstimmt mit Hilfe der Funktion *checkForMatch();
*/
  secondCard = this;
  checkForMatch();
}


/**
* Prüft , ob die Karten zusammenpassen
*/
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

/**
* Entfernt den EventListener, damit die Karten aufgedeckt bleiben, die richtig sind
*/
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
/**
* Setzt den Timer für Level 1 und Level 2, welcher in unflipCards() genutzt wird
*/

$ (document).on( "pageinit", "#p0", function( event ) {
    timer= 3500;
});

$ (document).on( "pageinit", "#p1", function( event ) {
    timer= 300;
});

/**
* Funktion zum Zurückdrehen der Karten
*/
function unflipCards() {


/**
* Das Board wird gesperrt, um zu verhindern, dass eine 3. Karte ausgewählt wird
*/
  lockBoard = true;
/**
* Ein Timeout wird gesetzt, um die Karten je nach Level 3500ms oder 300ms sehen zu können, danach werden sie wieder umgedreht
*/
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, timer);
}

/**
* Setzt alle Variablen wieder auf ihren ursprünglichen Wert
*/
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
/**
* Mischt  die Karten in zufälliger Reihenfolge durch
*/
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();


/**
* Fügt den EventListener für eine Karte hinzu, der bei einem Click die Karte umdreht
*/
cards.forEach(card => card.addEventListener('click', flipCard));
