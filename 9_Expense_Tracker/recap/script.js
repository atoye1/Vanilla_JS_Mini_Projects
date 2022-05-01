const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ?
    localStorageTransactions : [];
console.log(transactions);

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        console.log(transaction);
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        addTransactionDOM(transaction);

        updateValues();
        text.value = '';
        amount.value = '';
    }

}

function generateID() {
    return Math.floor(Math.random() * 10000);
}

// Add transcactions to DOM List
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.innerHTML = `${transaction.text} <span>$${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    list.appendChild(item);
}

// Update the balace, income and expenses
function updateValues() {
    const amounts = transactions.map(elem => elem.amount);
    console.log(amounts);
    const total = amounts.reduce((acc, item) => {
        return acc += item;
    }, 0).toFixed(2);
    console.log(total);
    const calcs = amounts.reduce((acc, item) => {
        if (item > 0) {
            acc[0] += item;
        } else {
            acc[1] -= item;
        }
        return acc;
    }, [0, 0]);
    const income = calcs[0].toFixed(2);
    const expense = calcs[1].toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

//Init app
function init() {
    list.innerHTML = '';
    transactions = localStorage.getItem('transactions') !== null ?
        localStorageTransactions : [];
    transactions.forEach(elem => addTransactionDOM(elem));
    updateValues();
}

init();

//Event listeners

form.addEventListener("submit", addTransaction);
