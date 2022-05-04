const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card

let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [
    {
        question: "what is my name",
        answer: "donghun seol"
    },
    {
        question: "13 + 7 = ?",
        answer: "20"
    },
    {
        question: "where do you live?",
        answer: "busan"
    },
    {
        question: "donghun seol's dream job is ...",
        answer: "To become a professional developer"
    }
];

// Create All Cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
            <p>${data.answer}</p>
            </div>
        </div> `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (currentActiveCard === cardsEl.length - 1) {
        console.log('no more page');
        cardsEl[currentActiveCard].classList.add('shake');
        setTimeout(() => { cardsEl[currentActiveCard].classList.remove('shake'); }, 500);
    } else {
        cardsEl[currentActiveCard].className = 'card left';
        currentActiveCard += 1;
        cardsEl[currentActiveCard].classList = 'card active';
        updateCurrentText();
    }
});

prevBtn.addEventListener('click', () => {

    if (currentActiveCard === 0) {
        console.log('no more page');
        cardsEl[currentActiveCard].classList.add('shake');
        setTimeout(() => { cardsEl[currentActiveCard].classList.remove('shake'); }, 500);
    } else {
        cardsEl[currentActiveCard].className = 'card right';
        currentActiveCard -= 1;
        cardsEl[currentActiveCard].classList = 'card active';
        updateCurrentText();
    }
});