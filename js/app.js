/**
 * Initializes the application by loading data after the DOM has fully loaded.
 * This ensures that all DOM elements are available and prevents errors in accessing 
 * elements that might not yet be loaded if the script runs too early. Data is loaded 
 * from 'data.js' into the global namespace to keep the application organized.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Data initializations
    const phrases = window.gameData.phrases;
    const sounds = window.gameData.sounds;

    // DOM definitions
    const keyboard = document.getElementById('qwerty');
    const keys = keyboard.getElementsByTagName("button");
    const phraseDisplay = document.getElementById('phrase');
    const phraseDisplayList = phraseDisplay.getElementsByTagName('ul')[0];
    const resetButton = document.getElementsByClassName('btn__reset')[0];
    const overlay = document.getElementById('overlay');
    const allLetters = document.getElementsByClassName('letter');
    const allShownLetters = document.getElementsByClassName('show');
    const hearts = document.querySelectorAll(".tries img");
    
    // The number of incorrect guesses initialization
    let numberMissed = 0;
    
    // Sound initializations
    const correctSound = new Audio(sounds.correct.path);
    const incorrectSound = new Audio(sounds.incorrect.path);
    const gameWinSound = new Audio(sounds.win.path);
    const gameLoseSound = new Audio(sounds.lose.path);

    // Event Listeners
    keyboard.addEventListener("click", e => {
        if(e.target.tagName  === "BUTTON") {
            e.target.setAttribute("disabled", "");
            e.target.classList.add("chosen");
            checkLetter(e.target.innerText) ? checkForWin() : checkForLose();
        }
    });

    resetButton.addEventListener("click", e => {
        overlay.style.display = "none";
        resetOverlayClasses();
        resetMissed();
        resetKeyboard();
        resetHearts();
        addPhraseToDisplay();
    });
    
    // Further initialization code can go here
});

Array.prototype.getRandomElement = function() {
    return this[~~(Math.random() * this.length)];
}

const addPhraseToDisplay = () => {
    const phrase = phrases.getRandomElement();
    const words = phrase.split(" ");
    let currentLineLength = 0;
    let maxCharsPerLine = 14;  // Max number of reasonable letters for 1024px
    let html = "";

    words.forEach((word, index) => {
        // Check if adding this word plus a space exceeds line length
        if (currentLineLength + word.length + 1 > maxCharsPerLine && currentLineLength > 0) {
            html += `<li class="break"></li>`;  // Insert a break if line is too long
            currentLineLength = 0;  // Reset the line length
        }

        // Add each letter of the word into <li> elements
        word.split('').forEach(letter => {
            html += `<li class="letter">${letter}</li>`;
        });

        // Add a space unless it's the last word
        if (index < words.length - 1) {
            html += `<li class="space"> </li>`;
        }
        currentLineLength += word.length + 1;  // Include space in count
    });

    phraseDisplayList.innerHTML = html;
};

const checkLetter = (buttonPressed) => {
    let match = false;
    for(let letter of allLetters) {
        if(letter.innerText === buttonPressed) {
            letter.classList.add("show", "animate__animated", "animate__fadeIn");
            match = true;
        }
    }
    match ? correctSound.play() : incorrectSound.play();
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
    endType == "win" ? gameWinSound.play() : gameLoseSound.play();
    let message = endType == "win" ? "Congratulations!" : "Sorry! Try again";
    resetButton.innerText = "Play again";
    overlay.style.display = "flex";
    overlay.classList.add(endType);
    overlay.getElementsByClassName("title")[0].innerText = message;
}

const removePhrase = () => {
    phraseDisplayList.innerHTML = "";
}

const resetKeyboard = () => {
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
