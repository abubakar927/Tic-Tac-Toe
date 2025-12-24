// Music
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let ting = new Audio("ting.mp3");

// Popup elements and reset button

const playButton = document.getElementById("playButton");
const popup = document.getElementById("popup");
const popup2 = document.getElementById("popup2");
const playAgainButton = document.getElementById("playAgainButton");
const resetButton = document.getElementById("resetGame");

// Play button to start the game

playButton.addEventListener("click", () => {
    music.play();
    popup.classList.add("hidden");
});

// Game variables

let turn = "X";
let gameOver = false;

// Grabing all boxes

const boxes = document.querySelectorAll(".grid div");

// Change turn function

const changeTurn = () => (turn === "X" ? "O" : "X");

// Show game over popup

const showGameOverPopup = (winnerText) => {
    popup2.querySelector("h1").innerText = winnerText;
    popup2.classList.remove("hidden"); 
    gameover.currentTime = 0; 
    gameover.play();
    music.pause();
};

// Function to check win

const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let pattern of winPatterns) {
        if (
            boxtexts[pattern[0]].innerText === boxtexts[pattern[1]].innerText &&
            boxtexts[pattern[1]].innerText === boxtexts[pattern[2]].innerText &&
            boxtexts[pattern[0]].innerText !== ""
        ) {
            gameOver = true;
            showGameOverPopup(`${boxtexts[pattern[0]].innerText} Wins!`);
            return true;
        }
    }

    // Check draw

    let isDraw = [...boxtexts].every(box => box.innerText !== "");
    if (!gameOver && isDraw) {
        gameOver = true;
        showGameOverPopup("It's a Draw!");
    }

    return false;
};

// Add click listeners to boxes

boxes.forEach(box => {
    let boxtext = document.createElement("span");
    boxtext.classList.add("boxtext");
    box.appendChild(boxtext);

    box.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();
            document.getElementById("turnDisplay").innerText = `Turn for: ${turn}`; 
        }
    });
});

// Play again button inside popup2

playAgainButton.addEventListener("click", () => {
    popup2.classList.add("hidden"); 
    gameover.pause();
    music.currentTime = 0;
    music.play();
    gameover.currentTime = 0

// Reset game board
   
    boxes.forEach(box => box.querySelector(".boxtext").innerText = "");
    turn = "X";
    gameOver = false;
});

// Reset button
resetButton.addEventListener("click", () => {
   boxes.forEach(box => box.querySelector(".boxtext").innerText = "");
   popup.classList.add("hidden");
   music.currentTime = 0;
});
