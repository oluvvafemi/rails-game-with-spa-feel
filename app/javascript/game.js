function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function computerPlay() {
  const mode = ["Rock", "Paper", "Scissors"];
  let randomNumber = getRandomInt(3);
  return mode[randomNumber];
}

function compareChoices(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    playedSameKindComment(playerSelection);
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
    xBeatsYcomment(computerSelection, playerSelection);
  } else {
    updateAndDisplayScore(1, 0);
    xBeatsYcomment(playerSelection, computerSelection);
  }
}

function playOneRound(playerSelection, computerSelection) {
  round += 1;
  roundsText.textContent = round;
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  switch (playerSelection) {
    case "rock":
      compareChoices(playerSelection, computerSelection);
      break;
    case "paper":
      compareChoices(playerSelection, computerSelection);
      break;
    case "scissors":
      compareChoices(playerSelection, computerSelection);
      break;
    default:
      break;
  }
  checkforWinner();
}

let updateAndDisplayScore = function (
  playerwin = 0,
  computerwin = 0,
  gameover = false
) {
  if (gameover) {
    playerScore = computerScore = 0;
  }
  playerScore += playerwin;
  computerScore += computerwin;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

let xBeatsYcomment = function (x, y) {
  result.textContent = `${x} beats ${y}`;
};

let playedSameKindComment = function (kind) {
  result.textContent = `you both played ${kind}`;
};

let prepareNewGame = function () {
  updateAndDisplayScore(0, 0, true);
  result.textContent = "";
  round = 0;
  roundsText.textContent = round;
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
let checkforWinner = function () {
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
