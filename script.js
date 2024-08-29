'use strict';
// selecting the Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
let playing, scores, activePlayer, currentScore;
const init = () => {
  diceEl.classList.add('hidden'); // undisplya dice

  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

rollDice.addEventListener('click', () => {
  if (playing) {
    //generate dice randomly
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check dice is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  // 1 add current score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2 check if >=100
  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
  //  3 switch to next player
});
newGame.addEventListener('click', init);
