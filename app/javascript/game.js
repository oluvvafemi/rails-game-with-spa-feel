let buttonRestPosition = function (e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("press");
};

let updateAndDisplayScore = function (data) {
  roundsText.textContent = data.game_data.round;
  playerScoreDisplay.textContent = data.game_data.player_score;
  computerScoreDisplay.textContent = data.game_data.computer_score;
  result.textContent = data.commentary;
};

let checkForWinner = function (gameStatus) {
  if (gameStatus == null || gameStatus === "in progress") return;

  let message = win_draw_loss(gameStatus);
  result.textContent = message;
  restartWindow();
};

let win_draw_loss = function (gameStatus) {
  if (gameStatus === "draw") return "It is a draw";

  return gameStatus === "win" ? "You won the game" : "Bot won the game";
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

const playerButtons = document.querySelectorAll(".player button");
const computerButtons = document.querySelectorAll(".computer button");
const playerScoreDisplay = document.querySelector("#playerscore");
const computerScoreDisplay = document.querySelector("#computerscore");
const result = document.querySelector("#result");
const roundsText = document.querySelector("#rounds-text");
const indicator = document.querySelector(".indicator");
const playground = document.querySelector(".playground");
const container = document.querySelector(".game-container");
const restartButton = document.createElement("button");

playerButtons.forEach((button) =>
  button.addEventListener("click", () => {
    fetch(`${location.origin}/round`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_selection: button.dataset.playerselection,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let computerButton = [...computerButtons].filter(
          (btn) => btn.dataset.computerselection === data.computer_selection
        )[0];
        button.classList.add("press");
        computerButton.classList.add("press");
        updateAndDisplayScore(data);
        checkForWinner(data.game_status);
      })
      .catch((err) => err);
  })
);

playerButtons.forEach((button) =>
  button.addEventListener("transitionend", buttonRestPosition)
);

computerButtons.forEach((button) =>
  button.addEventListener("transitionend", buttonRestPosition)
);
