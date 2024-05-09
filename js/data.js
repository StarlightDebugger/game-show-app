/* A place to house data that will be used by the game which does
   not need to be in the same file with the game logic. Separation of
   concerns and a method to keep app.js much cleaner. */

// Phrase data
const gamePhrases = [
    "mad as a hatter",
    "bad moon on the rise",
    "every cloud has a silver lining",
    "tomorrow never knows",
    "time waits for no one"
];

const gameMoods = {
    happy: {
        messages: [
           "outstanding victory!",
           "brilliant success!",
           "exceptional skill!",
           "you conquered!",
           "incredible win!",
           "magnificent play!",
           "supberb mastery!",
           "heroic achievement!",
           "unbelievable performance!",
           "supreme victory!" 
        ],
        emojis: [
            "😊", // Smiling face
            "🥳", // Party face
            "😂", // Face with tears of joy
            "🧠", // Brain
            "⭐", // Star
            "👍🏽", // Thumbs up (medium skin tone)
            "👏🏿", // Clapping hands (dark skin tone)
            "💃🏼", // Woman dancing (medium-light skin tone)
            "🕺🏾", // Man dancing (medium-dark skin tone)
            "🍾"  // Bottle with popping cork
        ]
    },
    sad: {
        messages: [
            "tough luck!",
            "so close!",
            "give it another shot!",
            "almost had it!",
            "nice try!",
            "keep pushing!",
            "you'll get it!",
            "not quite there!",
            "keep practicing!"
        ],
        emojis: [
            "😢", // Crying face
            "😔", // Pensive face
            "🙁", // Slightly frowning face
            "😞", // Disappointed face
            "😓", // Downcast face with sweat
            "👎🏼", // Thumbs down (medium-light skin tone)
            "💔", // Broken heart
            "😿", // Crying cat
            "🥀", // Wilted flower
            "🌧️"  // Cloud with rain
        ]
    }
};

// Sound data including Creative Commons attributions
const gameSounds = {
    correct: {
        path: "sounds/correct.wav",
        attribution: {
            sound_url: "https://freesound.org/people/GabFitzgerald/sounds/625174/",
            sound_name: "[UI Sound] Approval - High Pitched Bell Synth",
            author_url: "https://freesound.org/people/GabFitzgerald/",
            author_name: "GabFitzgerald",
            license_url: "http://creativecommons.org/publicdomain/zero/1.0/",
            license_name: "Creative Commons 0"
        }
    },
    incorrect: {
        path: "sounds/incorrect.mp3",
        attribution: {
            sound_url: "https://freesound.org/people/UNIVERSFIELD/sounds/734446/",
            sound_name: "Error #10",
            author_url: "https://freesound.org/people/UNIVERSFIELD/",
            author_name: "UNIVERSFIELD",
            license_url: "https://creativecommons.org/licenses/by/4.0/",
            license_name: "Attribution 4.0"
        }
    },
    win: {
        path: "sounds/game-win.wav",
        attribution: {
            "sound_url": "https://freesound.org/people/LittleRobotSoundFactory/sounds/274182/", 
            "sound_name": "Jingle_Win_Synth_05.wav", 
            "author_url": "https://freesound.org/people/LittleRobotSoundFactory/", 
            "author_name": "LittleRobotSoundFactory", 
            "license_url": "https://creativecommons.org/licenses/by/4.0/", 
            "license_name": "Attribution 4.0"
        }
    },
    lose: {
        path: "sounds/game-lose.wav",
        attribution: {
            "sound_url": "https://freesound.org/people/themusicalnomad/sounds/253886/", 
            "sound_name": "negative_beeps.wav", 
            "author_url": "https://freesound.org/people/themusicalnomad/", 
            "author_name": "themusicalnomad", 
            "license_url": "http://creativecommons.org/publicdomain/zero/1.0/", 
            "license_name": "Creative Commons 0"
        }
    }
};

// Exporting data by attaching to the window object to avoid namespace clutter
window.gameData = {
    phrases: gamePhrases,
    sounds: gameSounds,
    moods: gameMoods
};