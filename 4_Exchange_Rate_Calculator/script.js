const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");

const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEL = document.getElementById("rate");
const swap = document.getElementById("swap")

//Fetch exchange rate and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    console.log(currency_one, currency_two)

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two]
            rateEL.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
    console.log(rate);
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('change', calculate);

calculate();