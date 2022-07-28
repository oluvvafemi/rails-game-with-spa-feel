const playerButtons = document.querySelectorAll(".player button");

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
    }).then((response) => {
      console.log(response.json());
    });
  })
);
