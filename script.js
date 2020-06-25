const { forEach } = require("lodash");
const { SIGWINCH } = require("constants");

const player1 = document.querySelector("#player1"),
  player2 = document.querySelector("#player2"),
  buttons = document.querySelectorAll("button");

let gameboard = [null, null, null, null, null, null, null, null, null],
  prevClick = null,
  playerscore1 = 0,
  playerscore2 = 0,
  drawCounter = 0;

const constructor = () => {
  player1.innerHTML = `Player 1 Score: ${playerscore1}`;
  player2.innerHTML = `Player 2 Score: ${playerscore2}`;
  window.alert("Player One goes first");
};

const disable = (e) => {
  e.target.disabled = true;
};

const setPlayer = () => {
  prevClick = prevClick === null || prevClick === "O" ? "X" : "O";
  return prevClick;
};

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.target.innerText = setPlayer();
    disable(e);
    gameboard[e.target.id] = e.target.innerText;
    gameLogic();
    console.log(drawCounter);
  });
});

const gameLogic = () => {
  drawCounter++;
  winnerLogic("X");
  winnerLogic("O");
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
  if (drawCounter === 9 && confirm("The game is a draw")) {
    gameboard = [null, null, null, null, null, null, null, null, null];
    buttons.forEach((button) => {
      button.innerHTML = "";
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
    if (confirm("You are the winner! Play again?")) {
      gameboard = [null, null, null, null, null, null, null, null, null];
      buttons.forEach((button) => {
        button.innerHTML = "";
        button.disabled = false;
        drawCounter = 0;
      });
      if (Square === "X") {
        playerscore1++;
      } else {
        playerscore2++;
      }

      constructor();
    }
  }
};

constructor();
