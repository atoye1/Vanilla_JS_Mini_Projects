const search = document.getElementById("search");
const search_input = document.getElementById("search_input");
const meals = document.getElementById("meals");
const meals_heading = document.getElementById('meals-heading');
console.log(search);

function timeOutHandler() {

}
function fetchMealInfo(e) {
    e.preventDefault();
    if (!search_input.value) {
        search_input.classList.add("warning");
        search_input.setAttribute('placeholder', "please input a value!");

        setTimeout(() => {
            search_input.classList.remove("warning");
            search_input.setAttribute('placeholder', "Seach Here!");
        }, 2000);
        return;
    }
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_input.value}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayMeals(data));
}

function displayMeals(data) {
    if (data.meals === null) {
        meals_heading.innerHTML = `<h2>There is no result for "${search_input.value}", try again</h2>`;
        meals.innerHTML = '';
    } else {
        meals_heading.innerHTML = `<h2>Search results for "${search_input.value}"</h2>`;
        meals.innerHTML = data.meals.map(elem => `
        <div class="meal" id="meal">
        <img src="${elem.strMealThumb}"/>
        <div class="meal-info"> <h1>${elem.strMeal}</h1></div>
        </div>`).join('');
    }
}

search.addEventListener('submit', fetchMealInfo);