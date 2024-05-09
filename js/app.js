// Uninitialized global game data variables
let phrases, sounds, correctSound, incorrectSound, gameWinSound, gameLoseSound;

// Uninitialized global DOM Element variables
let keyboard, keys, phraseDisplay, phraseDisplayList, resetButton, overlay, allLetters, allShownLetters, hearts;

// Uninitialized Game Statistics variables
let numberMissed;

//===============================
// Initialization functions
//===============================

const initializeGameData = () => {
    phrases = window.gameData.phrases;
    sounds = window.gameData.sounds;
  
    // Initialize variables for different sounds
    correctSound = new Audio(sounds.correct.path);
    incorrectSound = new Audio(sounds.incorrect.path);
    gameWinSound = new Audio(sounds.win.path);
    gameLoseSound = new Audio(sounds.lose.path);
};

const initializeGameStatistics = () => {
    numberMissed = 0;
};

const initializeDOMVariables = () => {
    keyboard = document.getElementById('qwerty');
    keys = keyboard.getElementsByTagName("button");
    phraseDisplay = document.getElementById('phrase');
    phraseDisplayList = phraseDisplay.getElementsByTagName('ul')[0];
    resetButton = document.getElementsByClassName('btn__reset')[0];
    overlay = document.getElementById('overlay');
    allLetters = document.getElementsByClassName('letter');
    allShownLetters = document.getElementsByClassName('show');
    hearts = document.querySelectorAll(".tries img");
};

const addEventListeners = (e) => {
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
}

// =============================
// Helper Function Definitions
// =============================

/**
 * Because of frequent use a method was added directly onto the Array prototype
 * for readability purposes. A bitwise ~~ was used for the slight performance increase
 * over Math.floor(); This would not work if the value were a negative number or 
 * a string, but since it's a positive integer or 0, this is preferable.
 * https://stackoverflow.com/questions/13847053/difference-between-and-math-floor
 * 
 * @returns A random element from an array
 */
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

// ============================================================================
// Entry point to start the application and initialize data and variables
// ============================================================================
document.addEventListener("DOMContentLoaded", function() {
    initializeGameData();
    initializeGameStatistics();
    initializeDOMVariables();
    addEventListeners();
});
