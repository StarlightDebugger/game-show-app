const keyboard = document.getElementById('qwerty');
const keys = keyboard.getElementsByTagName("button");
const phraseDisplay = document.getElementById('phrase');
const phraseDisplayList = phraseDisplay.getElementsByTagName('ul')[0];
const resetButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');
const allLetters = document.getElementsByClassName('letter');
const allShownLetters = document.getElementsByClassName('show');
const hearts = document.querySelectorAll(".tries img");

let numberMissed = 0;

const phrases = [
    "mad as a hatter",
    "bad moon on the rise",
    "every cloud has a silver lining",
    "tomorrow never knows",
    "time waits for no one"
];

const getRandomPhraseAsArray = (phraseList) => {
    return phraseList[Math.floor(Math.random() * phraseList.length)].toLowerCase().split("");
};

const addPhraseToDisplay = () => {
    let listItemString = "";
    const phraseToAdd = getRandomPhraseAsArray(phrases);

    for(let letter of phraseToAdd) {
        listItemString += `<li class="${letter == " " ? "space" : "letter"}">${letter}</li>`;
    }
    phraseDisplayList.innerHTML = listItemString;
};

const checkLetter = (buttonPressed) => {
    let match = false;
    for(let letter of allLetters) {
        if(letter.innerText === buttonPressed) {
            letter.classList.add("show", "animate__animated", "animate__fadeIn");
            match = true;
        }
    }
    return match;
};

const checkForWin = () => {
    if(allLetters.length == allShownLetters.length) {
        endGame("win");
    }
};

const checkForLose = () => {
    numberMissed += 1;
    removeHeart();
    if(numberMissed > 4) {
        endGame("lose");
    }
};

const removeHeart = () => {
    hearts[hearts.length - numberMissed].setAttribute("src", "images/lostHeart.png");
};

const endGame = (endType) => {
    removePhrase();
    resetButton.innerText = "Play again";
    let message = endType == "win" ? "Congratulations!" : "Sorry! Try again";
    overlay.style.display = "flex";
    overlay.classList.add(endType);
    overlay.getElementsByClassName("title")[0].innerText = message;
}

const removePhrase = () => {
    phraseDisplayList.innerHTML = "";
}

keyboard.addEventListener("click", e => {
    if(e.target.tagName  === "BUTTON") {
        e.target.setAttribute("disabled", "");
        e.target.classList.add("chosen");
        checkLetter(e.target.innerText) ? checkForWin() : checkForLose();
    }
});

const resetKeyboard = () => {
    console.log("Resetting keyboard...");
    for(let key of keys) {
        key.removeAttribute("disabled");
        key.classList = "";
    }
};

const resetMissed = () => { numberMissed = 0; }

const resetHearts = () => {
    for(let heart of hearts) {
        heart.setAttribute("src", "images/liveHeart.png");
    }
};

const resetOverlayClasses = () => {
    overlay.classList = "start";
};

resetButton.addEventListener("click", e => {
    overlay.style.display = "none";
    resetOverlayClasses();
    resetMissed();
    resetKeyboard();
    resetHearts();
    addPhraseToDisplay();
});

