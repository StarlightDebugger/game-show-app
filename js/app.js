const keyboard = document.getElementById('qwerty');
const phraseDisplay = document.getElementById('phrase');
const resetButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');
let numberMissed = 0;

const phrases = [
    "mad as a hatter",
    "bad moon on the rise",
    "every cloud has a silver lining",
    "tomorrow never knows",
    "time waits for no one"
];


resetButton.addEventListener("click", e => {
    overlay.style.display = "none";
});

const getRandomPhraseAsArray = (phraseList) => {
    return phraseList[Math.floor(Math.random() * phraseList.length)].split("");
};
