// Query Selectors
const playerHeartsEl = document.querySelector('.player-hearts');
const computerHeartsEl = document.querySelector('.computer-hearts');
const scoreEl = document.querySelector('.score-display');
const playerEl = document.querySelector('.player-display');
const computerEl = document.querySelector('.computer-display');
const resultsEl = document.querySelector('.results-display');
const messageEl = document.querySelector('.message-display');
const btnContainer = document.querySelector('.btn-container');

// Load Images
const rockR = document.createElement('img');
rockR.src = 'images/rock-r.png';
const scissorsR = document.createElement('img');
scissorsR.src = 'images/scissors-r.png';
const paperR = document.createElement('img');
paperR.src = 'images/paper-r.png';
const rockL = document.createElement('img');
rockL.src = 'images/rock-l.png';
const scissorsL = document.createElement('img');
scissorsL.src = 'images/scissors-l.png';
const paperL = document.createElement('img');
paperL.src = 'images/paper-l.png';
// Add class to images
const imagesL = [rockL, paperL, scissorsL]
imagesL.forEach((image) => {
    image.classList.add("animated-l");
});
const imagesR = [rockR, paperR, scissorsR]
imagesR.forEach((image => {
    image.classList.add("animated-r")
}))


// Global Variables
let playerLives = 5;
let computerLives = 5;
let playerScore = 0;
let computerScore = 0;
let playerChoice;
let computerChoice;
let winner;

const choices = ['rock', 'paper', 'scissors'];



// Game Main
function playRound(playerSelection, computerSelection) {
    if (computerSelection == playerSelection) {
        resultsEl.innerHTML = 'Draw!'
        return 'draw'
    } else if (
        (computerSelection == 'rock' && playerSelection == 'scissors') ||
        (computerSelection == 'scissors' && playerSelection == 'paper') ||
        (computerSelection == 'paper' && playerSelection == 'rock')
    ) {
        resultsEl.innerHTML = `${capitalize(computerSelection)} beats ${capitalize(playerSelection)}!`
        return 'computer'
    } else {
        resultsEl.innerHTML = `${capitalize(playerSelection)} beats ${capitalize(computerSelection)}!`
        return 'player'
    }
}

function game(e) {
    playerChoice = e.target.id;
    computerChoice = getRandomItem(choices);
    showPlayer(playerChoice);
    showComputer(computerChoice);
    winner = playRound(playerChoice, computerChoice);
    updateScore(winner);
    updateMessage(winner);
    
    if (playerLives === 0 || computerLives === 0) {
        getWinner();
        removeChoiceButtons();
        appendStartButton();
    }
}

function getWinner() {
    if (playerScore > computerScore) {
        messageEl.innerHTML = 'You beat the computer!!!';
        messageEl.style.backgroundColor = '#cae16c'
    } else {
        messageEl.innerHTML = 'You lost the game!!!';
        messageEl.style.backgroundColor = 'crimson';
    }
}



// Track Score
function updateScore(winner) {
    if (winner == 'player') {
        playerScore++;
        computerLives--;
        displayScore(playerScore, computerScore);
        removeHeart(computerLives + 5);
    } else if (winner == 'computer') {
        computerScore++;
        playerLives--;
        displayScore(playerScore, computerScore);
        removeHeart(playerLives);
    } else {
        return
    }
}

function removeHeart(lives) {
    let targetId = lives;
    let targetHeart = document.getElementById(targetId);
    targetHeart.classList.add('fade-heart');
}

function updateMessage(winner) {
    if (winner == 'player') {
        messageEl.innerHTML = 'Nice one!';
        messageEl.style.backgroundColor = '#cae16c';
    } else if (winner == 'computer') {
        messageEl.innerHTML = 'Try again!';
        messageEl.style.backgroundColor = 'crimson';
    } else {
        messageEl.innerHTML = 'Copycat!';
        messageEl.style.backgroundColor = 'blue';
    }
}



// Display results

function displayScore(playerScore, computerScore) {
    scoreEl.textContent = `${playerScore} - ${computerScore}`
}


function showPlayer(playerChoice) {
    playerEl.innerHTML = ''
    if (playerChoice == 'rock') {
        playerEl.appendChild(rockL);
    } else if (playerChoice == 'scissors') {
        playerEl.appendChild(scissorsL);
    } else if (playerChoice == 'paper') {
        playerEl.appendChild(paperL);
    }
}

function showComputer(computerChoice) {
    computerEl.innerHTML = ''
    if (computerChoice == 'rock') {
        computerEl.appendChild(rockR);
    } else if (computerChoice == 'scissors') {
        computerEl.appendChild(scissorsR);
    } else if (computerChoice == 'paper') {
        computerEl.appendChild(paperR);
    }
}



// Add / remove elements

function createButtons() {
    choices.forEach((choice) => {
        const button = document.createElement('button');
        button.id = choice;
        button.innerText = choice;
        btnContainer.appendChild(button);
        button.addEventListener('click', game);
    });
}

function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('img');
        heart.src = 'images/heart.png';
        heart.id = i;
        if (i < 5) {
            playerHeartsEl.appendChild(heart);
        } else {
            computerHeartsEl.appendChild(heart);
        }
    }
}

function removeChoiceButtons() {
    btnContainer.innerHTML = '';
}

function appendStartButton() {
    const startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.textContent = 'Play Again'
    btnContainer.appendChild(startBtn);
    startBtn.addEventListener('click', () => {
        window.location.reload();
    })
}



// Helpers

function capitalize(string) {
    const lower = string.toLowerCase();
    return string.charAt(0).toUpperCase()
        + lower.slice(1);
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random()*arr.length);
    const item = arr[randomIndex];
    return item;
}





createHearts();
createButtons();