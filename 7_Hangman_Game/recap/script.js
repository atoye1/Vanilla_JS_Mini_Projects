const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const figureParts = document.querySelectorAll(".figure-part");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const popup = document.getElementById("popup-container");

const words = ['children', 'apartment', 'knou', 'homerun'];


let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    const splittedSelectedWord = selectedWord.split('').map((letter) => {
        return `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`;
    });
    wordEl.innerHTML = `${splittedSelectedWord.join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (selectedWord == innerWord) {
        finalMessage.innerText = "Congratulation! You Won! 👏";
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    if (wrongLetters.length > 0) {
        wrongLettersEl.innerHTML = '<h2><p>Wrong</p></h2>';
        wrongLetters.forEach((elem, index) => {
            const spanElem = document.createElement('span');
            spanElem.innerText = elem;
            wrongLettersEl.appendChild(spanElem);
            figureParts[index].style.display = 'block';
        });
    }
    if (wrongLetters.length == 6) {
        finalMessage.innerText = "You Lost Try Agian? 😢";
        popup.style.display = 'flex';
    }


};

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

window.addEventListener("keydown", e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (correctLetters.includes(letter)) {
                showNotification();
            } else {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (wrongLetters.includes(letter)) {
                showNotification();
            } else {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
        }
    }
});

displayWord();

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    correctLetters.
        selectedWord = word[Math.floor(Math.random() * words.length)];
    updateWrongLettersEl();
    displayWord();
    popup.style.display = 'none';

});