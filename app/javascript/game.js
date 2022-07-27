let getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

let computerPlay = function () {
  const mode = ["Rock", "Paper", "Scissors"];
  let randomNumber = getRandomInt(3);
  return mode[randomNumber];
};

let compareChoices = function (playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    playedSameKindComment(playerSelection);
    updateAndDisplayScore(0, 0);
    return;
  }

  let relation = {
    rock: {
      paper: 3,
      rock: 2,
      scissors: 1,
    },
    paper: {
      scissors: 3,
      paper: 2,
      rock: 1,
    },
    scissors: {
      rock: 3,
      scissors: 2,
      paper: 1,
    },
  };
  let order = relation[playerSelection];

  if (order[computerSelection] > order[playerSelection]) {
    updateAndDisplayScore(0, 1);
    xBeatsYComment(computerSelection, playerSelection);
  } else {
    updateAndDisplayScore(1, 0);
    xBeatsYComment(playerSelection, computerSelection);
  }
};

let playOneRound = function (playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  compareChoices(playerSelection, computerSelection);
  checkForWinner();
};

let updateAndDisplayScore = function (
  playerPointForRound = 0,
  computerPointForRound = 0,
  gameOver = false
) {
  if (gameOver) {
    playerScore = computerScore = 0;
    result.textContent = "";
    round = 0;
  } else {
    round += 1;
  }
  playerScore += playerPointForRound;
  computerScore += computerPointForRound;
  roundsText.textContent = round;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

let xBeatsYComment = function (x, y) {
  result.textContent = `${x} beats ${y}`;
};

let playedSameKindComment = function (kind) {
  result.textContent = `you both played ${kind}`;
};

let prepareNewGame = function () {
  updateAndDisplayScore(0, 0, true);
  indicator.classList.remove("off");
};

let buttonRestPosition = function (e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("press");
};

let allButtonsReset = function () {
  computerButtons.forEach((btn) => btn.classList.remove("press"));
  playerButtons.forEach((btn) => btn.classList.remove("press"));
};

let restartWindow = function () {
  restartButton.textContent = "Restart Game";
  playground.remove();
  container.appendChild(restartButton);
  indicator.classList.add("off");
  allButtonsReset();
};

let winnerText = function (playerScore, computerScore) {
  if (playerScore === computerScore) return "It is a draw";

  return playerScore > computerScore
    ? "You Win the Game!"
    : "Computer Wins the Game!";
};
let checkForWinner = function () {
  if (round < 5) return;

  result.textContent = winnerText(playerScore, computerScore);
  restartWindow();
};

let playerScore;
let computerScore;
let round = 0;
const playerScoreDisplay = document.querySelector("#playerscore");
const computerScoreDisplay = document.querySelector("#computerscore");
const playerButtons = document.querySelectorAll(".player button");
const result = document.querySelector("#result");
const roundsText = document.querySelector("#rounds-text");
const computerButtons = document.querySelectorAll(".computer button");
const indicator = document.querySelector(".indicator");
const playground = document.querySelector(".playground");
const container = document.querySelector(".game-container");
const restartButton = document.createElement("button");

prepareNewGame();

playerButtons.forEach((button) =>
  button.addEventListener("click", () => {
    let computerSelection = computerPlay();
    let computerButton = [...computerButtons].filter(
      (btn) => btn.dataset.computerselection === `${computerSelection}`
    )[0];
    button.classList.add("press");
    computerButton.classList.add("press");
    playOneRound(button.dataset.playerselection, computerSelection);
  })
);

playerButtons.forEach((button) =>
  button.addEventListener("transitionend", buttonRestPosition)
);

computerButtons.forEach((button) =>
  button.addEventListener("transitionend", buttonRestPosition)
);

restartButton.addEventListener("click", () => {
  container.appendChild(playground);
  restartButton.remove();
  prepareNewGame();
});
