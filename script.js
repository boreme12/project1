const buttons = document.querySelectorAll('button'),
  player1 = {
    name: 'Player 1',
    score: 0,
    ref: document.querySelector('#player1'),
  },
  player2 = {
    name: 'Player 2',
    score: 0,
    ref: document.querySelector('#player2'),
  };

let gameboard = [null, null, null, null, null, null, null, null, null],
  prevClick = null,
  drawCounter = 0;

buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    e.target.innerText = setPlayer();
    disable(e);
    gameboard[e.target.id] = e.target.innerText;
    gameLogic();
  });
});

const startGame = () => {
  injectScore(player1);
  injectScore(player2);
  playerPrompt();
};

const injectScore = (player) => {
  player.ref.innerHTML = `${player.name} Score: ${player.score}`;
};

const playerPrompt = () => {
  if (prevClick === 'O' || prevClick === null) {
    window.alert('Player One goes first');
  } else {
    window.alert('Player Two goes first');
  }
};

const disable = (e) => {
  e.target.disabled = true;
};

const setPlayer = () => {
  prevClick = prevClick === null || prevClick === 'O' ? 'X' : 'O';
  return prevClick;
};

const gameLogic = () => {
  drawCounter++;
  winnerLogic('X');
  winnerLogic('O');
  drawLogic();
};

const winnerLogic = (Square) => {
  Win(Square, [0, 3, 6]);
  Win(Square, [1, 4, 7]);
  Win(Square, [2, 5, 8]);
  Win(Square, [0, 1, 2]);
  Win(Square, [3, 4, 5]);
  Win(Square, [6, 7, 8]);
  Win(Square, [0, 4, 8]);
  Win(Square, [2, 4, 6]);
};

const drawLogic = () => {
  if (drawCounter === 9 && confirm('The game is a draw')) {
    gameboard = [null, null, null, null, null, null, null, null, null];
    buttons.forEach((button) => {
      button.innerHTML = '';
      button.disabled = false;
      drawCounter = 0;
    });
  }
};

const Win = (Square, winArr) => {
  if (
    gameboard[winArr[0]] === Square &&
    gameboard[winArr[1]] === Square &&
    gameboard[winArr[2]] === Square
  ) {
    if (confirm('You are the winner! Play again?')) {
      gameboard = [null, null, null, null, null, null, null, null, null];
      buttons.forEach((button) => {
        button.innerHTML = '';
        button.disabled = false;
        drawCounter = 0;
      });
      if (Square === 'X') {
        player1.score++;
      } else {
        player2.score++;
      }

      startGame();
    }
  }
};

startGame();
