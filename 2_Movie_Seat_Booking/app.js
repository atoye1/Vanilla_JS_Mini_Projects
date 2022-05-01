const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");


populateUI();
let ticketPrice = parseInt(movieSelect.value);


// Save selected Movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .selected")

    // Copy selected Seat into array
    // Map through array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    }) //Converts node list to normal JS array

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

// Get data from localstorage and pop UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// Movie select event


movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target);
        e.target.classList.toggle("selected")
        updateSelectedCount();
    }
});

updateSelectedCount();