const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
    e.preventDefault();
    single_mealEl.innerHTML = '';
    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                // console.log(data.meals[0]);

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There is no search results for '${term}'. Try again</p>`;
                } else {
                    mealsEl.innerHTML = `${data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `
                    ).join('')
                        } `;
                }
            });
        // Clear search Text
        search.value = '';
    } else {
        alert('Please Enter a search word');
    }
}
// Fetch meal by ID

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDom(meal);
        });
}

// Fetch meal random
function getRandomMeal() {
    // Clear meals heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch(`https:///www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            addMealToDom(data.meals[0]);
        });

}
// Add meal to Dom
function addMealToDom(meal) {
    console.log(meal);
    const ingredients = [];
    for (i = 1; i < 21; ++i) {
        const ingredString = meal[`strIngredient${i}`];
        if (ingredString) {
            const measureString = meal[`strMeasure${i}`];
            const combinedString = `${ingredString} - ${measureString}`;
            ingredients.push(combinedString);
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `<h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    </div> `;
}

//Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    console.log(mealInfo);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});;