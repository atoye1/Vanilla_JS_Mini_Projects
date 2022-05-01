const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// List of words for game
const inputString = "Log In Terms of Use Privacy Policy Accessibility & CC Ad Choices About Us Modern Slavery Act Statement Advertise with us CNN Store Newsletters Transcripts License Footage";
const words = inputString.split(' ').filter((elem) => {
    return isNaN(elem) ? elem.length > 3 ? true : false : false;
});

console.log(words);

// Init word, score, time
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;
// Focus on Text start

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to Dom
function addWordDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerText = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

//Game over, show end screen
function gameOver() {
    endGameEl.innerHTML = `<h1>Time ran out<h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
    endGameEl.style.display = 'flex';
    endGameEl.querySelector('button').focus();
}

// Start counting down
const timeInterval = setInterval(updateTime, 1000);


addWordDOM();
text.focus();

// Typing

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    console.log(insertedText);

    if (insertedText === randomWord) {
        addWordDOM();
        updateScore();

        e.target.value = '';
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 5;
        } else {
            time += 7;
        }
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});