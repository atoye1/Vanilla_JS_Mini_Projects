const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';


// Search by song or artist
async function searchSongs(term) {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);
    document.body.style.backgroundColor = "white";
}

// Show song and artist and DOM
function showData(data) {
    let output = '';
    // data.data.forEach(song => {
    //     output += `
    //     <li>
    //     <span><strong>${song.artist.name}</strong> - ${song.title} </span>
    //     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics</button>
    //     </li>
    //     `;
    // });
    data.data.map((song) => {
        output += `
        <li>
        <div class="song-info"><span><strong>${song.artist.name}</strong> - ${song.title} </span></div>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics</button>
        </li>
        `;
    });
    result.innerHTML = `<ul class="songs">${output}</ul>`;

    if (data.prev || data.next) {
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }

}

// Get More Songs
async function getMoreSongs(url) {

    result.innerHTML = '';
    more.innerHTML = '';
    const heroku_proxy = "https://cors-anywhere.herokuapp.com/";
    const res = await fetch(`${heroku_proxy}${url}`);
    const data = await res.json();
    showData(data);
}

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

    more.innerHTML = '';
}

// Event listeners

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    if (searchTerm === '') {
        alert("Please Type in a SearchTerm");
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics button click

result.addEventListener('click', e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
});