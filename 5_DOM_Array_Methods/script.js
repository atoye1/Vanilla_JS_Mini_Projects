const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user and add money
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function doubleMoney() {
    data = data.map((elem) => {
        return { ...elem, money: elem.money * 2 };
    });
    updateDOM();
}

// Sort user by richest
function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// Filter only millionaire
function showMillionaires() {
    data = data.filter(elem => elem.money >= 1000000)
    console.log(data);
    updateDOM();
}

// Add new obj to dat arr
function addData(obj) {
    console.log(obj);
    data.push(obj);
    updateDOM();
}

// Calculate Wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => acc += user.money, 0);
    console.log(wealth);
    let wealthText = document.querySelector("#wealthText");
    if (!wealthText) {
        wealthText = document.createElement("div");
        wealthText.id = "wealthText";
        main.appendChild(wealthText);
    }
    wealthText.innerHTML = `<div><h3>${formatMoney(wealth)}</h3></div>`;
}

//updateDOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> \$${formatMoney(item.money)}`
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)