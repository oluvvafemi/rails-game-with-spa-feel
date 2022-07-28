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

const playerButtons = document.querySelectorAll(".player button");
const computerButtons = document.querySelectorAll(".computer button");
const playerScoreDisplay = document.querySelector("#playerscore");
const computerScoreDisplay = document.querySelector("#computerscore");
const result = document.querySelector("#result");
const roundsText = document.querySelector("#rounds-text");

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
