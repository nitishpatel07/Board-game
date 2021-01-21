'use strict';

const dice1 = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const globalscore0 = document.querySelector('#score--0');
const globalscore1 = document.querySelector('#score--1');
const localscore0 = document.querySelector('#current--0');
const localscore1 = document.querySelector('#current--1');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnnew = document.querySelector('.btn--new');

let score, activePlayer, globalscore, playing;

const reset = function () {
  score = 0;
  activePlayer = 0;
  globalscore = [0, 0];
  playing = true;

  dice1.classList.add('hidden');
  globalscore0.textContent = 0;
  globalscore1.textContent = 0;
  localscore0.textContent = 0;
  localscore1.textContent = 0;
};
reset();

btnroll.addEventListener('click', function () {
  if (playing) {
    //generate a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //display the dice
    dice1.classList.remove('hidden');
    dice1.src = `dice-${dice}.png`;

    //check for the dice value to be 1 and switch it to next player
    if (dice === 1) {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      score = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    } else {
      //add the current score
      score = score + dice;
      document.getElementById(`current--${activePlayer}`).textContent = score;
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //add the current score to the global score
    globalscore[activePlayer] += score;
    document.getElementById(`score--${activePlayer}`).textContent =
      globalscore[activePlayer];

    if (globalscore[activePlayer] >= 100) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER !';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    score = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

btnnew.addEventListener('click', function () {
  reset();

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';
});
