const playerHeartsEl = document.querySelector('.player-hearts')
const computerHeartsEl = document.querySelector('.computer-hearts')
const scoreEl = document.querySelector('.score-display')
const playerDisplay = document.querySelector('.player-display')
const computerDisplay = document.querySelector('.computer-display')
const messageEl = document.querySelector('.message-display')
const endmessageEl = document.querySelector('.endmessage-display')
const buttonEl = document.querySelector('.button-display')
const startButton = document.querySelector('.start-button')

//load images
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
const lost = document.createElement('img');
lost.src = 'images/lost.png';
const won = document.createElement('img');
won.src = 'images/won.png';


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

function displayScore(playerScore, computerScore) {
    scoreEl.textContent = `${playerScore} - ${computerScore}`
}

function removeHeart(lives) {
    let targetId = lives;
    let targetHeart = document.getElementById(targetId);
    targetHeart.style.visibility = 'hidden'
}

function showPlayer(playerChoice) {
    playerDisplay.innerHTML = ''
    if (playerChoice == 'rock') {
        playerDisplay.appendChild(rockL);
    } else if (playerChoice == 'scissors') {
        playerDisplay.appendChild(scissorsL);
    } else if (playerChoice == 'paper') {
        playerDisplay.appendChild(paperL);
    }
}

function showComputer(computerChoice) {
    computerDisplay.innerHTML = ''
    if (computerChoice == 'rock') {
        computerDisplay.appendChild(rockR);
    } else if (computerChoice == 'scissors') {
        computerDisplay.appendChild(scissorsR);
    } else if (computerChoice == 'paper') {
        computerDisplay.appendChild(paperR);
    }
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
    showPlayer(playerChoice);
    showComputer(computerChoice);
    winner = playRound(playerChoice, computerChoice);
    updateScore(winner);
    
    if (playerLives === 0 || computerLives === 0) {
        getWinner();
        removeChoices();
        appendStartButton();
    }
}

choices.forEach((choice) => {
    const button = document.createElement('button');
    button.id = choice;
    button.innerText = choice;
    buttonEl.appendChild(button);
    button.addEventListener('click', handleClick);
});



// end game //

function getWinner() {
    if (playerScore > computerScore) {
        endmessageEl.textContent = 'You beat the computer!!!'
    } else {
        endmessageEl.textContent = 'You lost the game!!!'
    }
}

function removeChoices() {
    buttonEl.innerHTML = '';
}

function appendStartButton() {
    const startButton = document.createElement('button');
    startButton.id = 'start-button';
    startButton.textContent = 'Play Again'
    buttonEl.appendChild(startButton);
    startButton.addEventListener('click', () => {
        window.location.reload();
    })
}