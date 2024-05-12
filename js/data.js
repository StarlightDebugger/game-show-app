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
        ],
        colors: [
            "#FFFFFF", // White
            "#FFD700", // Gold
            "#FF69B4", // Hot Pink
            "#7CFC00", // Lawn Green
            "#00BFFF", // Deep Sky Blue
            "#9370DB", // Medium Purple
            "#FFA07A", // Light Salmon
            "#FF6347", // Tomato
            "#FA8072", // Salmon
            "#FFFF54", // Laser Lemon
            "#FFC0CB", // Pink
            "#FFB6C1", // Light Pink
            "#FF4500", // Orange Red
            "#FF8C00", // Dark Orange
            "#FFFF00", // Yellow
            "#00FF00", // Lime
            "#32CD32", // Lime Green
            "#98FB98", // Pale Green
            "#00FA9A", // Medium Spring Green
            "#00FFFF", // Aqua
            "#E0FFFF", // Light Cyan
            "#ADD8E6", // Light Blue
            "#87CEFA", // Light Sky Blue
            "#87CEEB", // Sky Blue
            "#4682B4", // Steel Blue
            "#DDA0DD", // Plum
            "#EE82EE", // Violet
            "#DA70D6", // Orchid
            "#FF00FF", // Magenta
            "#BA55D3", // Medium Orchid
            "#9400D3", // Dark Violet
            "#8A2BE2", // Blue Violet
            "#4B0082", // Indigo
            "#7B68EE", // Medium Slate Blue
            "#6A5ACD"  // Slate Blue
        ],
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
        ],
        colors: [
            "#000000", // Black
            "#708090", // Slate Gray
            "#778899", // Light Slate Gray
            "#2F4F4F", // Dark Slate Gray
            "#696969", // Dim Gray
            "#808080", // Gray
            "#A9A9A9", // Dark Gray
            "#C0C0C0", // Silver
            "#8B4513", // Saddle Brown
            "#483D8B", // Dark Slate Blue
            "#4B0082", // Indigo
            "#8B0000", // Dark Red
            "#800000", // Maroon
            "#556B2F", // Dark Olive Green
            "#006400", // Dark Green
            "#8B008B", // Dark Magenta
            "#9400D3", // Dark Violet
            "#663399", // Rebecca Purple
            "#333333", // Very Dark Gray
            "#4A4A4A", // Mid Dark Gray
            "#555555", // Davy's Gray
            "#191970", // Midnight Blue
            "#000080", // Navy
            "#00008B", // Dark Blue
            "#27408B", // Royal Blue (dark)
            "#3B3B3B", // Dark Charcoal
            "#5D5D5D", // Dim Dark Gray
            "#7F7F7F", // Gray (Web)
            "#202020", // Onyx
            "#3D3D3D", // Jet
            "#2C2C2C", // Charleston Green
            "#36454F", // Charcoal
            "#1B1B1B", // Eerie Black
            "#0C0C0C", // Rich Black
            "#262626"  // Dark Gray (X11)
        ],
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