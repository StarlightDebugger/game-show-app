const keyboard = document.getElementById('qwerty');
const phraseDisplay = document.getElementById('phrase');
const resetButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');
const allLetters = document.getElementsByClassName('letter');
const allShownLetters = document.getElementsByClassName('show');

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
    phraseDisplay.getElementsByTagName('ul')[0].innerHTML = listItemString;
};

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
    const hearts = document.querySelectorAll(".tries img");
    hearts[5 - numberMissed].setAttribute("src", "images/lostHeart.png");
};

const endGame = (endType) => {
    resetButton.style.display = "none";
    let message = "";
    message = endType == "win" ? "Congratulations!" : "Sorry! Try again";
    overlay.style.display = "flex";
    overlay.classList.add(endType);
    overlay.getElementsByClassName("title")[0].innerText = message;
}

keyboard.addEventListener("click", e => {
    if(e.target.tagName  === "BUTTON") {
        e.target.setAttribute("disabled", "true");
        e.target.classList.add("chosen");
        checkLetter(e.target.innerText) ? checkForWin() : checkForLose();
    }
});


addPhraseToDisplay();
