const main = document.querySelector("main");
const voicesSelect = document.querySelector("select#voices");
const textarea = document.querySelector("#text");
const readBtn = document.querySelector("#read");
const toggleBtn = document.querySelector("#toggle");
const closeBtn = document.querySelector("#close");

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');
    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
    <image src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    // @todo - sepack event

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add Active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [{ voiceURI: 'Yuna', name: 'Yuna', lang: 'ko-KR', localService: true, default: true },
{ voiceURI: 'Alex', name: 'Alex', lang: 'en-US', localService: true, default: false },
{ voiceURI: 'Alice', name: 'Alice', lang: 'it-IT', localService: true, default: false },
{ voiceURI: 'Alva', name: 'Alva', lang: 'sv-SE', localService: true, default: false },
{ voiceURI: 'Amelie', name: 'Amelie', lang: 'fr-CA', localService: true, default: false },
{ voiceURI: 'Anna', name: 'Anna', lang: 'de-DE', localService: true, default: false },
{ voiceURI: 'Carmit', name: 'Carmit', lang: 'he-IL', localService: true, default: false },
{ voiceURI: 'Damayanti', name: 'Damayanti', lang: 'id-ID', localService: true, default: false },
{ voiceURI: 'Daniel', name: 'Daniel', lang: 'en-GB', localService: true, default: false },
{ voiceURI: 'Diego', name: 'Diego', lang: 'es-AR', localService: true, default: false },
{ voiceURI: 'Fiona', name: 'Fiona', lang: 'en', localService: true, default: false },
{ voiceURI: 'Fred', name: 'Fred', lang: 'en-US', localService: true, default: false },
{ voiceURI: 'Ioana', name: 'Ioana', lang: 'ro-RO', localService: true, default: false },
{ voiceURI: 'Ellen', name: 'Ellen', lang: 'nl-BE', localService: true, default: false },
{ voiceURI: 'Joana', name: 'Joana', lang: 'pt-PT', localService: true, default: false },
{ voiceURI: 'Jorge', name: 'Jorge', lang: 'es-ES', localService: true, default: false },
{ voiceURI: 'Juan', name: 'Juan', lang: 'es-MX', localService: true, default: false },
{ voiceURI: 'Kanya', name: 'Kanya', lang: 'th-TH', localService: true, default: false },
{ voiceURI: 'Karen', name: 'Karen', lang: 'en-AU', localService: true, default: false },
{ voiceURI: 'Kyoko', name: 'Kyoko', lang: 'ja-JP', localService: true, default: false },
{ voiceURI: 'Laura', name: 'Laura', lang: 'sk-SK', localService: true, default: false },
{ voiceURI: 'Lekha', name: 'Lekha', lang: 'hi-IN', localService: true, default: false },
{ voiceURI: 'Luca', name: 'Luca', lang: 'it-IT', localService: true, default: false },
{ voiceURI: 'Luciana', name: 'Luciana', lang: 'pt-BR', localService: true, default: false },
{ voiceURI: 'Maged', name: 'Maged', lang: 'ar-SA', localService: true, default: false },
{ voiceURI: 'Mariska', name: 'Mariska', lang: 'hu-HU', localService: true, default: false },
{ voiceURI: 'Mei-Jia', name: 'Mei-Jia', lang: 'zh-TW', localService: true, default: false },
{ voiceURI: 'Melina', name: 'Melina', lang: 'el-GR', localService: true, default: false },
{ voiceURI: 'Milena', name: 'Milena', lang: 'ru-RU', localService: true, default: false },
{ voiceURI: 'Moira', name: 'Moira', lang: 'en-IE', localService: true, default: false },
{ voiceURI: 'Monica', name: 'Monica', lang: 'es-ES', localService: true, default: false },
{ voiceURI: 'Nora', name: 'Nora', lang: 'nb-NO', localService: true, default: false },
{ voiceURI: 'Paulina', name: 'Paulina', lang: 'es-MX', localService: true, default: false },
{ voiceURI: 'Rishi', name: 'Rishi', lang: 'en-IN', localService: true, default: false },
{ voiceURI: 'Samantha', name: 'Samantha', lang: 'en-US', localService: true, default: false },
{ voiceURI: 'Sara', name: 'Sara', lang: 'da-DK', localService: true, default: false },
{ voiceURI: 'Satu', name: 'Satu', lang: 'fi-FI', localService: true, default: false },
{ voiceURI: 'Sin-ji', name: 'Sin-ji', lang: 'zh-HK', localService: true, default: false },
{ voiceURI: 'Tessa', name: 'Tessa', lang: 'en-ZA', localService: true, default: false },
{ voiceURI: 'Thomas', name: 'Thomas', lang: 'fr-FR', localService: true, default: false },
{ voiceURI: 'Ting-Ting', name: 'Ting-Ting', lang: 'zh-CN', localService: true, default: false },
{ voiceURI: 'Veena', name: 'Veena', lang: 'en-IN', localService: true, default: false },
{ voiceURI: 'Victoria', name: 'Victoria', lang: 'en-US', localService: true, default: false },
{ voiceURI: 'Xander', name: 'Xander', lang: 'nl-NL', localService: true, default: false },
{ voiceURI: 'Yelda', name: 'Yelda', lang: 'tr-TR', localService: true, default: false },
{ voiceURI: 'Yuri', name: 'Yuri', lang: 'ru-RU', localService: true, default: false },
{ voiceURI: 'Zosia', name: 'Zosia', lang: 'pl-PL', localService: true, default: false },
{ voiceURI: 'Zuzana', name: 'Zuzana', lang: 'cs-CZ', localService: true, default: false },];

function getVoices() {
    console.log(voices);

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

function setTextMessage(text) {
    message.text = text;
}

// Speak the text

function speakText() {
    speechSynthesis.speak(message);
}
//Voices chagned
speechSynthesis.addEventListener('voicechanged', getVoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change', setVoice);
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speechSynthesis.speak(message);
});
getVoices();