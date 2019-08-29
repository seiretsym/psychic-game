//// Begin Psychic Game Scripts

/// declare variables
// text variables
var textWins = document.getElementById("wins"),
    textLosses = document.getElementById("losses"),
    textGuesses = document.getElementById("guesses"),
    textGuessed = document.getElementById("guessed");

// arrays
var alpha = ["abcdefghijklmnopqrstuvwxyz"];
var usedChar = [];

// cpu variables
var cpuLetter = randChar(alpha);

/// make functions

// add point to win and reset game
function win() {
    textWins.textContent = parseInt(textWins.textContent) + 1;
    reGame();
}

// add point to lose and reset game
function lose() {
    textLosses.textContent = parseInt(textLosses.textContent) + 1;
    reGame();
}

// select a random letter
function randChar(array) {
    var letter = alpha[0][Math.floor(Math.random() * array[0].length)];
    return letter;
}

// restart game 
function reGame() {
    usedChar = [];
    textGuessed.textContent = "";
    cpuLetter = randChar(alpha);
    textGuesses.textContent = 10;
}

// guess
function guess(key) {
    // check if key was used
    if (notUsed(key)) {
        // check if key is cpu key
        if (key === cpuLetter) {
            win();
        }
        // deduct remaining guesses if not
        else {
            textGuesses.textContent = parseInt(textGuesses.textContent) - 1;
            usedLetter(key);
            if (parseInt(textGuesses.textContent) == 0) {
                lose();
            }
        }
    }
}

// check if letter has been used
function notUsed(key) {
    var boolKey = false;
    for (var k = 0; k < usedChar.length; k++) {
        if (key === usedChar[k]) {
            boolKey = true;
        }
    }

    if (boolKey) {
        return false;
    }
    else {
        usedChar.push(key);
        console.log(usedChar);
        return true;
    }
}

// add a letter to the used letters list
function usedLetter(key) {
    textGuessed.textContent = textGuessed.textContent + key + ", ";
}

// check if key is valid
function cmpKey(key) {
    // loop to read and compare from character array
    for (var k = 0; k < alpha[0].length; k++) {
       if (key === alpha[0][k]) {
           return true;
       } 
    }
}

/// on key press events
document.onkeyup = function(event) {
    var key = event.key.toLowerCase();
    console.log(cpuLetter);
    if (cmpKey(key)) {
        guess(key);
    }
}