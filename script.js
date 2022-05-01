const projects = document.getElementById("projects");

const projectsList = [
    "1_Form_Validator",
    "2_Movie_Seat_Booking",
    "3_Custom_Video_Player",
    "4_Exchange_Rate_Calculator",
    "5_DOM_Array_Methods",
    "6_Menu_Slider_Modal",
    "7_Hangman_Game",
    "8_Meal_Finder",
    "9_Expense_Tracker",
    "10_Music_Player",
    "11_Infinite_Scroll_Posts",
    "12_Typing_Game",
    "14_Memory_Cards"
];

projectsList.forEach(elem => {
    const outerLink = document.createElement('a');
    const innerDiv = document.createElement('div');
    outerLink.classList.add('project-link');
    outerLink.href = `${elem}/index.html`;
    innerDiv.classList.add('project');
    // innerDiv.innerHTML = `<div class="text">${elem}</div>`;
    innerDiv.innerText = elem;
    outerLink.appendChild(innerDiv);
    projects.appendChild(outerLink);
});;