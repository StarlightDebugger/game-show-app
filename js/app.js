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
    return phraseList[Math.floor(Math.random() * phraseList.length)].toLowerCase().split("");
};

const addPhraseToDisplay = () => {
    let listItemString = "";
    const phraseToAdd = getRandomPhraseAsArray(phrases);

    for(let letter of phraseToAdd) {
        listItemString += `<li class="${letter == " " ? "space" : "letter"}">${letter}</li>`;
    }
    phraseDisplay.innerHTML = listItemString;
}

const checkLetter = (buttonPressed) => {
    const displayedPhrase = document.querySelectorAll('.letter');
    let match = false;
    for(let letter of displayedPhrase) {
        if(letter.innerText === buttonPressed) {
            letter.classList.add("show");
            match = true;
        }
    }
    return match;
}

keyboard.addEventListener("click", e => {
    if(e.target.tagName  === "BUTTON") {
        e.target.classList.add("chosen");
        e.target.disable;
        checkLetter(e.target.innerText);
    }
});


addPhraseToDisplay();
checkLetter("o");