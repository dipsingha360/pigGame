/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
alert(
    "GAMES RULES ::    Set final Score (By default it set in 100) and Roll Dice for point. if the player rolls a 1, all his ROUND score gets lost and it's next player's turn. Then The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn. AND The first player to reach FINAL SCORE on GLOBAL score he can wins the game "
);

var score, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // A random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        //update the round score
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector(
                "#current-" + activePlayer
            ).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the game
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];
        //2nd challange
        var input = document.querySelector(".final-score").value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check player if won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent =
                "WINNER!";
            document.querySelector(".dice").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

var nextPlayer = function () {
    //next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
};
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
