// Game words & definitions
const words = [
  { function: "Unit of the code in JS" },
  { loop: "Repeats a block of code" },
  { array: "List of elements" },
  { object: "Key-value pairs" },
  { variable: "Container for data" },
  { event: "Action that occurs in the browser" },
  { DOM: "Document Object Model" },
  { API: "Application Programming Interface" },
  { closure: "Function with access to its outer scope" },
  { class: "Template for creating objects in OOP" },
];

// Global variables
let selectedWord = "";
let displayedWord = [];
let remainingAttempts = 0;

// References to DOM elements
const definitionElem = document.getElementById("definition");
const wordDisplayElem = document.getElementById("word-display");
const letterInputElem = document.getElementById("letter-input");
const wordInputElem = document.getElementById("word-input");
const attemptsElem = document.getElementById("attempts");
const gameMessageElem = document.getElementById("game-message");
const guessButton = document.getElementById("guess-button");

// Start Game Function
function startGame() {
  // Select a random word
  const randomEntry = words[Math.floor(Math.random() * words.length)];
  selectedWord = Object.keys(randomEntry)[0]; // The word to guess
  displayedWord = Array(selectedWord.length).fill("⬛"); // Black squares
  remainingAttempts = Math.ceil(selectedWord.length * 0.3); // 30% of word length

  // Update UI
  definitionElem.textContent = randomEntry[selectedWord]; // Show definition
  wordDisplayElem.textContent = displayedWord.join(" "); // Show black squares
  attemptsElem.textContent = remainingAttempts; // Show attempts left

  // Reset Inputs
  letterInputElem.value = "";
  wordInputElem.value = "";
  wordInputElem.readOnly = true; // Lock full word input initially
  letterInputElem.disabled = false; // Enable letter input
  gameMessageElem.textContent = ""; // Clear messages
}

// Function to handle input and update squares accordingly
function onLetterInput() {
  const guessedLetter = inputLetterElem.value; // Letter entered by user
  const letterPositions = [];

  // Check if the guessed letter is in the word
  let isLetterInWord = false;

  // Loop through the word and record positions of the correct letter
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guessedLetter) {
      letterPositions.push(i);
      isLetterInWord = true;
    }
  }

  // If the letter is not in the word, change all squares to black
  if (!isLetterInWord) {
    letterElems.forEach(elem => {
      elem.style.backgroundColor = "black";
    });
  } else {
    // Otherwise, reveal the letter in all positions where it occurs
    letterElems.forEach((elem, i) => {
      if (letterPositions.includes(i)) {
        elem.style.backgroundColor = "white"; // Correct position
      } else {
        elem.style.backgroundColor = "black"; // Incorrect position
      }
    });
  }

  // Disable further input if the max letter limit is reached
  if (allowedTryels > 0) {
    allowedTryels--;
  }
  updateLetterCount();
}

// Handle letter input
function handleLetterInput() {
  const letter = letterInputElem.value.toLowerCase();
  if (!letter) return;

  let correctGuess = false;
  word.split('').forEach((char, index) => {
    if (char === letter) {
      guessedWord[index] = letter;
      correctGuess = true;
    }
  });

  if (correctGuess) {
    showGuessedWord();
  } else {
    showIncorrectGuess();
  }

  letterInputElem.value = '';
}

// Show guessed letters
function showGuessedWord() {
  wordDisplayElem.innerHTML = '';
  guessedWord.forEach((letter, index) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    if (letter !== '_') {
      letterDiv.textContent = letter;
      letterDiv.classList.add('correct');  // Mark correct letters
    } else {
      letterDiv.textContent = '_';
    }
    wordDisplayElem.appendChild(letterDiv);
  });
}

// Handle incorrect guesses
function showIncorrectGuess() {
  // Implement a visual indicator for incorrect guesses (e.g., reduce attempts)
  if (tryels > 0) tryels--;
  updateGameStatus();
  wordDisplayElem.innerHTML = '';
  word.split('').forEach((char, index) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    letterDiv.textContent = '_';
    letterDiv.classList.add('incorrect');  // Mark incorrect letters
    wordDisplayElem.appendChild(letterDiv);
  });
}

// Update the game status
function updateGameStatus() {
  attemptsLabelElem.textContent = `Attempts left: ${tryels}`;
}

// Update word display
function updateWordDisplay() {
  wordDisplayElem.innerHTML = '';
  word.split('').forEach(() => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    letterDiv.textContent = '_';
    wordDisplayElem.appendChild(letterDiv);
  });
}



// Handle Letter Input
function handleLetterInput() {
  const letter = letterInputElem.value.toLowerCase();
  letterInputElem.value = ""; // Clear input after entry

  if (!selectedWord.includes(letter)) {
    remainingAttempts--; // Reduce attempts if wrong
  } else {
    // Reveal correct letters
    selectedWord.split("").forEach((char, index) => {
      if (char === letter) displayedWord[index] = letter;
    });
  }

  // Update UI
  wordDisplayElem.textContent = displayedWord.join(" ");
  attemptsElem.textContent = remainingAttempts;

  // Check if attempts are exhausted
  if (remainingAttempts === 0) {
    enableWordInput();
  }
}

// Enable Whole Word Guessing
function enableWordInput() {
  wordInputElem.readOnly = false; // Unlock word input
  letterInputElem.disabled = true; // Disable letter input
  guessButton.disabled = true;
  gameMessageElem.textContent = "Enter your final guess!";
}

// Check Final Guess
wordInputElem.addEventListener("change", function () {
  if (wordInputElem.value.toLowerCase() === selectedWord) {
    gameMessageElem.textContent = "🎉 Correct! You won!";
  } else {
    gameMessageElem.textContent = `❌ Wrong! The word was: ${selectedWord}`;
  }
  document.getElementById("play-again").style.display = "block"; // Show Play Again
});
