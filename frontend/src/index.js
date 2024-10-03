const guessButton = document.getElementById('guessButton');
const guessInput = document.getElementById('guessInput');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscores');

let score = 0;

async function fetchHighscores() {
    const response = await fetch('http://localhost:3000/highscores');
    const highscores = await response.json();
    displayHighscores(highscores);
}

function displayHighscores(highscores) {
    highscoreElement.innerHTML = '';
    highscores.forEach(({ name, score }) => {
        const li = document.createElement('li');
        li.textContent = `${name}: ${score}`;
        highscoreElement.appendChild(li);
    });
}

guessButton.addEventListener('click', async () => {
    const guess = parseInt(guessInput.value);
    const computerGuess = Math.floor(Math.random() * 3) + 1;

    if (guess === computerGuess) {
    
        score++;
        resultElement.textContent = 'Correct! Guess again.';
    } else {
        
        resultElement.textContent = 'Wrong! Your score has been reset.';
        const shouldSubmitScore = await submitScore(score);

        
        if (shouldSubmitScore) {
            const playerName = prompt('New high score! Enter your name:');
            await saveHighscore(playerName, score);
        }

       
        score = 0;
    }

    
    scoreElement.textContent = score;
    await fetchHighscores();
});

async function submitScore(currentScore) {
    
    const response = await fetch('http://localhost:3000/highscores');
    const highscores = await response.json();

   
    return highscores.length < 5 || currentScore > highscores[4].score;
}

async function saveHighscore(name, score) {
    
    await fetch('http://localhost:3000/highscores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score }),
    });
}


fetchHighscores();
