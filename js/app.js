// Uninitialized global game data variables
let phrases, sounds, moods, happy, sad, correctSound, incorrectSound, gameWinSound, gameLoseSound;

// Uninitialized global DOM Element variables
let keyboard, keys, phraseDisplay, phraseDisplayList, resetButton, overlay, allLetters, allShownLetters, hearts;

// Uninitialized Game Statistics variables
let numberMissed, phrase;

//===============================
// Initialization functions
//===============================

/**
 * Load in data from data.js to ensure
 * that it is available when needed by other
 * parts of the code
 */
const initializeGameData = () => {
    phrases = window.gameData.phrases;
    sounds = window.gameData.sounds;
    moods = window.gameData.moods;
    happy = moods.happy;
    sad = moods.sad;
  
    // Initialize variables for different sounds
    correctSound = new Audio(sounds.correct.path);
    incorrectSound = new Audio(sounds.incorrect.path);
    gameWinSound = new Audio(sounds.win.path);
    gameLoseSound = new Audio(sounds.lose.path);
};

/**
 * Sets the number of missed to an initial value of 0.
 * This will also hold streak information later.
 */
const initializeGameStatistics = () => {
    numberMissed = 0;
};

/**
 * Initialization of variables relating to DOM elements.
 * getElement(s)By was used in most cases other than hearts which
 * has a trickier selector. But because that element never loses or gains
 * an element it is fine as static. allShownLetters and allLetters were specifically
 * getElementsBy in the global scope to prevent re-querying the DOM when
 * unnecessary.
 */
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

const initializeNewDOMElements = () => {
    const overlayParagraph = document.createElement('p');
    overlay.appendChild(overlayParagraph);
    overlayParagraph.setAttribute("id", "overlay-message");
}

/**
 * Function to add event listeners to previously defined DOM elements.
 * The event object 'e' is explicitly passed to handle Firefox's non-global event handling.
 * @param {Event} e - The global event object needed by the event listeners.
 */
const addEventListeners = (e) => {
    /**
     * Attach an event listener for a click on the onscreen keyboard.
     * Filters for buttons only
     * @listens {click} listens for click anywhere on the #qwerty keyboard
     * @param {Event} e global event object
     */
    keyboard.addEventListener("click", e => {
        if(e.target.tagName  === "BUTTON") {
            e.target.setAttribute("disabled", "");
            e.target.classList.add("chosen");
            checkLetter(e.target.innerText) ? checkForWin() : checkForLose();
        }
    });

    /**
     * Attach event listener to the link that starts/resets the game.
     * @listens {click} listens for click on class "btn__reset" element
     * @param {Event} e global event listener
     */
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

/**
 * Gets random element from phrases Array as a string
 * Splits string on space and turns into array of words
 * Loops through array of words and determines if a space or line
 * break is needed to keep words from wrapping onto a new
 * line mid-word.
 * Updates innerHTML of the containing <ul> with
 * concatenated string of list items.
 */
const addPhraseToDisplay = () => {
    phrase = phrases.getRandomElement();
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

/**
 * Initialize match to false.
 * Loops through all list items containing letters. If there was a match, show the letter
 * and set the value of match to true. After loop return value of match.
 * Play correct or incorrect sound based on the value of match.
 * @param {Event.target} buttonPressed the onscreen keyboard key that was pressed
 * @returns {Boolean} whether the letter of the button pressed matches a letter in the phrase
 */
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

/**
 * Checks to see if all letters in the phrase are shown.
 * If all letters are displayed, indicating the player has successfully guessed all letters,
 * the game ends with a win condition.
 */
const checkForWin = () => {
    if(allLetters.length == allShownLetters.length) {
        endGame("win");
    }
};

/**
 * Checks to see if all hearts are gone
 * and the number of incorrect guesses has reached 5.
 * If so, it calls the endGame function and passes the
 * string "lose".
 */
const checkForLose = () => {
    numberMissed += 1;
    removeHeart();
    if(numberMissed > 4) {
        endGame("lose");
    }
};

/**
 * When a user guesses incorrectly, the rightmost filled heart
 * swaps out the image to display a blank heart indicating the 
 * loss of heart or "life."
 */
const removeHeart = () => {
    hearts[hearts.length - numberMissed].setAttribute("src", "images/lostHeart.png");
};

/**
 * Begins by removing the list items from the ul containing the phrase.
 * If this is not done, the letters show through the end game overlay.
 * Message and sound to indicate if the game was won or lost.
 * Overlay displayed.
 * @param {String} endType indicates if the game was won or lost 
 */
const endGame = (endType) => {
    removePhrase();
    const overlayTitle = document.getElementsByClassName("title")[0];
    const mood = endType == "win" ? moods.happy : moods.sad;
    overlay.classList.add(endType);
    endType == "win" ? gameWinSound.play() : gameLoseSound.play();
    let message = `${mood.messages.getRandomElement()} ${mood.emojis.getRandomElement()}`;
    resetButton.innerText = "Play again";
    overlayTitle.classList.add(mood.font_rule);
    overlayTitle.style.textTransform = "capitalize";
    document.getElementById("overlay-message").innerText = `Correct answer: "${phrase}"`;
    overlay.style.display = "flex";
    overlayTitle.innerText = message;
}

/**
 * Remove the letters from the ul to prevent them from
 * displaying through the overlay upon game end.
 */
const removePhrase = () => {
    phraseDisplayList.innerHTML = "";
}

/**
 * Loops through onscreen keyboard and removes disabled attribute
 * and removes the "chosen" class from the keys to indicate that
 * they have not been pressed again since the beginning of the current round.
 */
const resetKeyboard = () => {
    for(let key of keys) {
        key.removeAttribute("disabled");
        key.classList = "";
    }
};

/**
 * Resets the number missed at the beginning of the round to 0
 */
const resetMissed = () => { numberMissed = 0; }

/**
 * Refills the hearts from a blank heart png
 * to a filled heart png indicating that "lives"
 * have been restored at the beginning of a new round.
 */
const resetHearts = () => {
    for(let heart of hearts) {
        heart.setAttribute("src", "images/liveHeart.png");
    }
};

/**
 * Resets the overlay class to its initial state before
 * a round is ever played. At that point, there is no win nor loss
 * so this is needed as a starting point.
 */
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
    initializeNewDOMElements();
    addEventListeners();
});
