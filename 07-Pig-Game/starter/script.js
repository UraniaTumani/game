'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

diceEl.classList.add('hidden');
const scores = [0, 0]; // Final scores for both players
let currentScore = 0;
let activePlayer = 0; // Player 1
let playing = true;

const init = function () {
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0; // Player 1
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Reset the current player's score and switch to the next player
      switchPlayer();
    }
  }
}); // Properly close the event listener's function block

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the active player's score >= 100 to finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Add 'player--winner' class to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Remove 'player--active' class from the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Optionally, hide the dice and disable the buttons
      diceEl.classList.add('hidden');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
  // 1. Add current score to active player's score
});

const newgame = document
  .querySelector('.btn--new')
  .addEventListener('click', init);
