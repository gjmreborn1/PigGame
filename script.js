const dice1 = document.querySelector(".dice-1");
const dice2 = document.querySelector(".dice-2");

const gameState = {
    gameOver: false,
    winningScore: 100
};

const player1 = {
    container: document.querySelector(".player-0"),
    current: true,
    nameElement: document.getElementById("name-0"),
    roundScore: {
        element: document.getElementById("current-0"),
        value: 0
    },
    savedScore: {
        element: document.getElementById("score-0"),
        value: 0
    },
    reset() {
        this.roundScore.value = 0;
        this.savedScore.value = 0;
        this.nameElement.textContent = "PLAYER 1";
    },
    update() {
        this.roundScore.element.textContent = this.roundScore.value;
        this.savedScore.element.textContent = this.savedScore.value;
    }
};

const player2 = {
    container: document.querySelector(".player-1"),
    current: false,
    nameElement: document.getElementById("name-1"),
    roundScore: {
        element: document.getElementById("current-1"),
        value: 0
    },
    savedScore: {
        element: document.getElementById("score-1"),
        value: 0
    },
    reset() {
        this.roundScore.value = 0;
        this.savedScore.value = 0;
        this.nameElement.textContent = "PLAYER 2";
    },
    update() {
        this.roundScore.element.textContent = this.roundScore.value;
        this.savedScore.element.textContent = this.savedScore.value;
    }
};

function switchPlayers() {
    player1.current = !(player1.current);
    player2.current = !(player2.current);

    player1.container.classList.toggle("player-active");
    player2.container.classList.toggle("player-active");
}

function checkGameOver() {
    if(player1.savedScore.value >= gameState.winningScore) {
        player1.nameElement.textContent = "WINNER!";
        gameState.gameOver = true;
        dice1.style.display = "none";
        dice2.style.display = "none";
    }

    if(player2.savedScore.value >= gameState.winningScore) {
        player2.nameElement.textContent = "WINNER!";
        gameState.gameOver = true;
        dice1.style.display = "none";
        dice2.style.display = "none";
    }
}

player1.update();
player2.update();
dice1.style.display = "none";
        dice2.style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", () => {
    if(!gameState.gameOver) {
        dice1.style.display = "block";
        dice2.style.display = "block";
        let dice1Number = getRandom(1, 7), dice2Number = getRandom(1, 7);

        dice1.setAttribute("src", `dice-${dice1Number}.png`);
        dice2.setAttribute("src", `dice-${dice2Number}.png`);
        if(player1.current) {
            if(dice1Number === 1 || dice2Number === 1) {
                player1.roundScore.value = 0;
                switchPlayers();
            } else {
                player1.roundScore.value += dice1Number;
                player1.roundScore.value += dice2Number;
            }
        } else {
            if(dice1Number === 1 || dice2Number === 1) {
                player2.roundScore.value = 0;
                switchPlayers();
            } else {
                player2.roundScore.value += dice1Number;
                player2.roundScore.value += dice2Number;
            }
        }
        player1.update();
        player2.update();
    }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    if(!gameState.gameOver) {
        if(player1.current) {
            player1.savedScore.value += player1.roundScore.value;
            player1.roundScore.value = 0;
        } else {
            player2.savedScore.value += player2.roundScore.value;
            player2.roundScore.value = 0;
        }

        switchPlayers();

        player1.update();
        player2.update();
        checkGameOver();
    }
});

document.querySelector(".btn-new").addEventListener("click", () => {
    switchPlayers();
    dice1.style.display = "block";
    dice2.style.display = "block";
    player1.reset();
    player2.reset();

    player1.update();
    player2.update();
    gameState.gameOver = false;
});

document.getElementById("winning-score-input").addEventListener("change", e => {
    gameState.winningScore = Number(e.target.value);
    document.getElementById("winning-score-lbl")
            .textContent = `Winning score (${gameState.winningScore}):`;
});
