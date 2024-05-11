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

/**
 * Animations to be used per round in the game.
 * These could be used per guess, but it seems like too much and too distracting
 * for my tastes.
 */
const gameAnimations = {
    entrances: [
        "backInDown",
        "backInLeft",
        "backInRight",
        "backInUp",
        "bounceIn",
        "bounceInDown",
        "bounceInLeft",
        "bounceInRight",
        "bounceInUp",
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "fadeInTopLeft",
        "fadeInTopRight",
        "fadeInBottomLeft",
        "fadeInBottomRight",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "zoomIn",
        "zoomInDown",
        "zoomInLeft",
        "zoomInRight",
        "zoomInUp",
        "slideInDown",
        "slideInLeft",
        "slideInRight",
        "slideInUp"
    ],
    exits: [
        "backOutDown",
        "backOutLeft",
        "backOutRight",
        "backOutUp",
        "bounceOut",
        "bounceOutDown",
        "bounceOutLeft",
        "bounceOutRight",
        "bounceOutUp",
        "fadeOut",
        "fadeOutDown",
        "fadeOutDownBig",
        "fadeOutLeft",
        "fadeOutLeftBig",
        "fadeOutRight",
        "fadeOutRightBig",
        "fadeOutUp",
        "fadeOutUpBig",
        "fadeOutTopLeft",
        "fadeOutTopRight",
        "fadeOutBottomRight",
        "fadeOutBottomLeft",
        "rotateOut",
        "rotateOutDownLeft",
        "rotateOutDownRight",
        "rotateOutUpLeft",
        "rotateOutUpRight",
        "zoomOut",
        "zoomOutDown",
        "zoomOutLeft",
        "zoomOutRight",
        "zoomOutUp",
        "slideOutDown",
        "slideOutLeft",
        "slideOutRight",
        "slideOutUp"
    ],
    attentionGetters: [
        "bounce",
        "flash",
        "pulse",
        "rubberBand",
        "shakeX",
        "shakeY",
        "headShake",
        "swing",
        "tada",
        "wobble",
        "jello",
        "heartBeat"
    ]
}

// Colors to use during gameplay before a win or a loss
const gameUIColors = [
    "#FF6347", // Tomato
    "#FF4500", // OrangeRed
    "#FFD700", // Gold
    "#FFA500", // Orange
    "#FF69B4", // HotPink
    "#FF1493", // DeepPink
    "#DB7093", // PaleVioletRed
    "#E6E91A", // Laser Lemon
    "#32CD32", // LimeGreen
    "#00FF00", // Lime
    "#7CFC00", // LawnGreen
    "#40E0D0", // Turquoise
    "#00FA9A", // MediumSpringGreen
    "#00BFFF", // DeepSkyBlue
    "#1E90FF", // DodgerBlue
    "#9370DB", // MediumPurple
    "#8A2BE2", // BlueViolet
    "#BA55D3", // MediumOrchid
    "#FF00FF", // Magenta
    "#FF8C00", // DarkOrange
    "#FF6347", // Tomato
    "#FF7F50", // Coral
    "#4682B4", // SteelBlue
    "#6A5ACD", // SlateBlue
    "#DA70D6"  // Orchid
];

// Object to hold different bits of data relating to the mood of the game as determined by a win or a loss
const gameMoods = {
    happy: {
        font_rule: "happy-font",
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
        font_rule: "sad-font",
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
    moods: gameMoods,
    uiColors: gameUIColors,
    animations: gameAnimations
};