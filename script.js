const playerHeartsEl = document.querySelector('.player-hearts')
const computerHeartsEl = document.querySelector('.computer-hearts')
const scoreEl = document.querySelector('.score-display')
const playerDisplay = document.querySelector('.player-display')
const computerDisplay = document.querySelector('.computer-display')
const messageEl = document.querySelector('.message-display')
const endmessageEl = document.querySelector('.endmessage-display')
const choicesEl = document.querySelector('.choice-display')
const startButton = document.querySelector('.start-button')


//create and show hearts
for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.textContent = '💙';
    heart.id = i;
    playerHeartsEl.appendChild(heart);
}
for (let i = 5; i < 10; i++) {
    const heart = document.createElement('div');
    heart.textContent = '💙';
    heart.id = i;
    computerHeartsEl.appendChild(heart);
}

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

function showSelected(playerChoice, computerChoice) {
    playerDisplay.textContent = playerChoice;
    computerDisplay.textContent = computerChoice;
}

function displayScore(playerScore, computerScore) {
    scoreEl.textContent = `${playerScore} - ${computerScore}`
}

function removeHeart(lives) {
    let targetId = lives;
    let targetHeart = document.getElementById(targetId);
    targetHeart.style.visibility = 'hidden'
}

function playRound(playerSelection, computerSelection) {
    if (computerSelection == playerSelection) {
        messageEl.textContent = 'Draw!'
        return 'draw'
    } else if (
        (computerSelection == 'rock' && playerSelection == 'scissors') ||
        (computerSelection == 'scissors' && playerSelection == 'paper') ||
        (computerSelection == 'paper' && playerSelection == 'rock')
    ) {
        messageEl.textContent = `${capitalize(computerSelection)} beats ${capitalize(playerSelection)}!`
        return 'computer'
    } else {
        messageEl.textContent = `${capitalize(playerSelection)} beats ${capitalize(computerSelection)}!`
        return 'player'
    }
}

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




// game //

let playerChoice;
let computerChoice;
let playerLives = 5;
let computerLives = 5;
let playerScore = 0;
let computerScore = 0;
let winner;

const choices = ['rock', 'paper', 'scissors'];


const handleClick = (e) => {
    playerChoice = e.target.id;
    computerChoice = getRandomItem(choices);
    showSelected(playerChoice, computerChoice);
    winner = playRound(playerChoice, computerChoice);
    updateScore(winner);
    
    if (playerLives === 0 || computerLives === 0) {
        getWinner();
        hideChoices();
        showStartButton();
    }
}

choices.forEach((choice) => {
    const button = document.createElement('button');
    button.id = choice;
    button.innerText = choice;
    choicesEl.appendChild(button);
    button.addEventListener('click', handleClick);
});



// end game //

function getWinner() {
    if (playerScore > computerScore) {
        endmessageEl.textContent += 'You beat the computer!!!'
    } else {
        endmessageEl.textContent += 'You lost the game!!!'
    }
}

function hideChoices() {
    choicesEl.style.visibility = 'hidden';
}

function showStartButton() {
    startButton.style.visibility = 'visible';
    startButton.addEventListener('click', () => {
        window.location.reload();
    })
}