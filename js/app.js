"use strict";

// Uninitialized global game data variables
let phrases, animations, roundAnimations, sounds, moods, happy, sad, correctSound, incorrectSound, 
    gameWinSound, gameLoseSound, allSounds, gameColors, uiColors;

// Uninitialized global DOM Element variables
let keyboard, banner, cloud, keys, messaging, phraseDisplay, phraseDisplayList, resetButton, overlay, 
    overlayTitle, allLetters, allShownLetters, header, hearts, soundButton, settingsAndInfo;


// Unitialized Game options
let soundEnabled;

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
    uiColors = window.gameData.uiColors;
    animations = window.gameData.animations;
    happy = moods.happy;
    sad = moods.sad;
  
    // Initialize variables for different sounds
    correctSound = new Audio(sounds.correct.path);
    incorrectSound = new Audio(sounds.incorrect.path);
    gameWinSound = new Audio(sounds.win.path);
    gameLoseSound = new Audio(sounds.lose.path);
    allSounds = [correctSound, incorrectSound, gameWinSound, gameLoseSound];
    // Set the volume to a reasonable level to start
    allSounds.forEach((sound) => sound.volume = 0.3);
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
    banner = document.getElementById('banner');
    header = document.getElementsByClassName('header')[0];
    messaging = document.getElementById('messaging');
    keyboard = document.getElementById('qwerty');
    keys = keyboard.getElementsByTagName("button");
    phraseDisplay = document.getElementById('phrase');
    phraseDisplayList = phraseDisplay.getElementsByTagName('ul')[0];
    resetButton = document.getElementsByClassName('btn__reset')[0];
    overlay = document.getElementById('overlay');
    overlayTitle = document.getElementsByClassName("title")[0];
    allLetters = document.getElementsByClassName('letter');
    allShownLetters = document.getElementsByClassName('show');
    hearts = document.querySelectorAll(".tries img");
};

/**
 * Because altering the HTML directly in the index.html file is not encouraged
 * for this project, some DOM objects need to be created through JavaScript.
 */
const initializeNewDOMElements = () => {
    // Create SVG with filter
    const cloudSVGDiv = document.createElement("div");
    cloudSVGDiv.setAttribute("id", "cloud");
    cloudSVGDiv.innerHTML = `<svg width="0">
                            <filter id="filter">
                                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="10" />
                                <feDisplacementMap in="SourceGraphic" scale="300" />
                            </filter>
                        </svg>`;
    messaging.insertAdjacentElement('beforebegin', cloudSVGDiv);
    // Create a div and elements to display accessibility settings and streak information
    settingsAndInfo = document.createElement("div");
    settingsAndInfo.setAttribute("id", "settings-and-info");
    soundButton = document.createElement("button");
    soundButton.setAttribute("id", "sound-button");
    soundButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    settingsAndInfo.appendChild(soundButton);
    banner.insertAdjacentElement('beforebegin', settingsAndInfo);
    // Create a paragraph for messaging purposes on the overlay
    const overlayParagraph = document.createElement('p');
    overlayParagraph.setAttribute("id", "overlay-message");
    resetButton.insertAdjacentElement('beforebegin', overlayParagraph);
};

/**
 * Function to initialize options that affect how the game is experienced by the player
 */

const initializeGameOptions = () => {
    soundEnabled = true;
};

/**
 * Function to initialize colors on the UI while playing the game such as the letters and title
 */
const initializeUIColors = () => {
    gameColors = {
        header: uiColors.getRandomElement(),
        letterBackground: uiColors.getRandomElement()
    }
    header.style.color = gameColors.header;
}

/**
 * Function to initialize animations to be used in a single round.
 * Randomizing animations per guess is too much.
 */
const initializeRoundAnimations = () => {
    roundAnimations = {
        heartOut: animations.exits.getRandomElement(),
        overlayIn: "fadeIn",
        letterIn: animations.entrances.getRandomElement()
    };
};

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
        resetOverlay();
        resetMissed();
        resetKeyboard();
        resetHearts();
        addPhraseToDisplay();
        initializeUIColors();
        initializeRoundAnimations();
        setHeartHues();
    });

    soundButton.addEventListener("click", (e) => {
        toggleSounds(e);
        toggleSoundIcon(e);
    });

    /**
     * Attach event listener to prevent user from highlighting
     * the hidden letters. If they want to cheat, they will have to open
     * either the source code or the console!
     * Note: initially tried with select, but the select event doesn't fire until 
     * after the letters have been highlighted!
     * @listens {mousedown} on the UL where the hidden letters are attached
     * @param {Event} e global event object
     */
    phraseDisplayList.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    /**
     * Attach event listener to enable playing using the physical keyboard.
     * This is for accessibility purposes.
     * @listens {keydown}
     * @param {Event} e global event object
     */
    document.addEventListener("keydown", (e) => {
        // press the start or play again button using Enter/Return if the overlay is active
        if(overlay.style.display != "none" && e.code === "Enter") {
            resetButton.click();
        } else {  // otherwise, loop through the keys and press the corresponding key case insensitive
            const keyPressed = e.key.toLocaleLowerCase();
            for(let key of keys) {
                if(key.innerText === keyPressed) {
                    key.click();
                    break;
                }
            }
        }
    });
}

// =============================
// Helper Function Definitions
// =============================

// If the getRandomElement does not exist on the Array data type, add it
if (!Array.prototype.getRandomElement) {
    /**
     * Extends the Array prototype to include a `getRandomElement` method.
     * Utilizes a bitwise double NOT operator (`~~`) to truncate the decimal, 
     * providing a slight performance increase over `Math.floor()`. This method is
     * intended for use with arrays containing non-negative integer indices.
     * Note: Assumes the array is not empty.
     * 
     * One benefit of defining this method on the Array prototype is that IDEs will
     * not offer `getRandomElement` as a completion option for objects that are not arrays,
     * thereby providing a modicum of type safety.
     * 
     * Reference on performance: 
     * https://stackoverflow.com/questions/13847053/difference-between-and-math-floor
     * 
     * @returns {any} A random element from the array or `undefined` if the array is empty.
     */
        Array.prototype.getRandomElement = function() {
            return this.length === 0 ? undefined : this[~~(Math.random() * this.length)];
        };
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
            letter.classList.add("show", "animate__animated", `animate__${roundAnimations.letterIn}`);
            letter.style.background = gameColors.letterBackground;
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
    const lastHeart = hearts[hearts.length - numberMissed];
    lastHeart.classList.add("animate__animated", `animate__${roundAnimations.heartOut}`);
    lastHeart.setAttribute("src", "images/lostHeart.png");
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
    const mood = endType == "win" ? moods.happy : moods.sad;
    const contrastingMoodColor = endType == "win" ? uiColors.getRandomElement() : "white";
    messaging.style.background = endType == "win" ? "white" : "black";
    messaging.style.opacity = 0.8;
    overlay.style.background = mood.colors.getRandomElement();
    document.getElementById("cloud").style.boxShadow = createDynamicClouds(mood.colors);
    overlay.classList = "start";
    overlay.classList.add(endType, "animate__animated", `animate__${roundAnimations.overlayIn}`);
    endType == "win" ? gameWinSound.play() : gameLoseSound.play();
    let message = `${mood.messages.getRandomElement()} ${mood.emojis.getRandomElement()}`;
    overlayTitle.innerText = message;
    overlay.style.color = contrastingMoodColor;
    resetButton.style.backgroundColor = uiColors.getRandomElement();
    resetButton.style.color = "white";
    resetButton.innerText = "Play again";
    overlayTitle.classList.add(mood.font_rule);
    overlayTitle.style.textTransform = "capitalize";
    document.getElementById("overlay-message").innerText = `Correct answer: "${phrase}"`;
    overlay.style.display = "flex";
    setHeartHues();
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
        heart.classList = "";
        heart.setAttribute("src", "images/liveHeart.png");
    }
};

/**
 * Resets the overlay class to its initial state before
 * a round is ever played. At that point, there is no win nor loss
 * so this is needed as a starting point.
 */
const resetOverlay = () => {
    overlay.classList = "start";
    overlayTitle.classList = "";
    overlay.style.display = "none";
};

/**
 * Mute all sounds on page
 */
const toggleSounds = () => {
    soundEnabled = !soundEnabled;
    for(let sound of allSounds) {
        sound.muted = !soundEnabled;
    }
}

/**
 * Toggle the sound icon to reflect whether sound is on or off
 */
const toggleSoundIcon = (e) => {
    soundButton.innerHTML = soundEnabled ? 
        `<i class="fa-solid fa-volume-high"></i>` :
        `<i class="fa-solid fa-volume-off"></i>`;
}

/**
 * Utility function to get a random number given a lower and upper bound
 * Again, the double negation unary operator is used here for performance purposes.
 * Although this may be used to generate negative numbers we're doing so randomly
 * and a value of 1 is within the tolerance range and negligible to the effects.
 * Lower bound is inclusive.
 * Upper bound is EXCLUSIVE!!!
 * @param {Number} lower the lower bound for the number to be returned inclusive
 * @param {Number} upper the upper bound for the number to be returned NOT INCLUSIVE
 * @returns {Number} integer between lower (inclusive) and upper (exclusive)
*/
const getRandomNumber = (lower, upper) => {
    return ~~(Math.random() * (upper - lower) + lower);
}

/**
 * Sets a random hue on a heart. Function needed because any filter
 * applied to the image while the overlay is on causes the hearts to show
 * through the overlay.
 */
const setHeartHues = () => {
    const newHeartHue = getRandomNumber(0, 360);
    const newHeartSaturation = `${getRandomNumber(50, 250)}%`;
    overlay.style.display == "none" ? 
    hearts.forEach((heart) => heart.style.filter = `hue-rotate(${newHeartHue}deg) saturate(${newHeartSaturation})`) :
    hearts.forEach((heart) => heart.style.removeProperty("filter"));
}

/**
 * Adapted heavily from this codepen https://codepen.io/yuanchuan/pen/OBRrrO/f70a1f9435dc90197b253b26b4d69d42
 * JS was entirely rewritten due to the original JS not having good
 * naming conventions for functions and variables. The idea here is that we
 * are creating an SVG out of a bunch of randomly generated box shadows 
 * based on randomly selected colors. The result is a fairly realistic
 * cloudy sky.
 * @param {Array} moodColors the array of colors from which to generate the clouds
 */
const createDynamicClouds = (moodColors) => {
    const svgResult = [];
    for(let i = 0; i < 100; i++) {
        svgResult.push(`${getRandomNumber(1,100)}vw ${getRandomNumber(1, 100)}vh ${getRandomNumber(10, 35)}vmin ${getRandomNumber(1, 25)}vmin ${moodColors.getRandomElement()}`);
    }
    return svgResult.join(",");
}
// ============================================================================
// Entry point to start the application and initialize data and variables
// ============================================================================
document.addEventListener("DOMContentLoaded", function() {
    initializeGameData();
    initializeGameStatistics();
    initializeDOMVariables();
    initializeNewDOMElements();
    initializeGameOptions();
    initializeUIColors();
    initializeRoundAnimations();
    addEventListeners();
});
