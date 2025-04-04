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
let remainingAllowedGuesses = 0; // 30% of word length

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

  remainingAllowedGuesses = Math.ceil(selectedWord.length * 0.3); // 30% of word length

  // Update UI
  definitionElem.textContent = randomEntry[selectedWord]; // Show definition
  wordDisplayElem.textContent = displayedWord.join(" "); // Show black squares
  attemptsElem.textContent = remainingAttempts; // Show attempts left
  updateLetterCount(); // Display remaining allowed guesses

  // Reset Inputs
  letterInputElem.value = "";
  wordInputElem.value = "";
  wordInputElem.readOnly = true; // Lock full word input initially
  letterInputElem.disabled = false; // Enable letter input
  gameMessageElem.textContent = ""; // Clear messages
}

// Update the remaining guesses count
function updateLetterCount() {
  const letterCountElem = document.getElementById("letter-count");
  letterCountElem.textContent = `Letters remaining: ${remainingAllowedGuesses}`;
}

// Handle Letter Input
function onLetterInput() {
  const guessedLetter = letterInputElem.value.toLowerCase(); // Letter entered by user

  if (remainingAllowedGuesses <= 0) {
    gameMessageElem.textContent =
      "You have used all your guesses! Try to guess the word!";
    return;
  }

  let correctGuess = false;

  // Loop through the word and record positions of the correct letter
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      displayedWord[i] = guessedLetter; // Correct letter placed in correct position
      correctGuess = true;
    }
  }

  // If the letter is not in the word, decrease allowed guesses
  if (!correctGuess) {
    remainingAllowedGuesses--; // Decrease remaining guesses if the letter is incorrect
  }

  // Update UI
  wordDisplayElem.textContent = displayedWord.join(" ");
  updateLetterCount();

  // Check if there are no more guesses left
  if (remainingAllowedGuesses <= 0) {
    gameMessageElem.textContent = "Game over! You've run out of guesses.";
    letterInputElem.disabled = true; // Disable further letter input
  }

  // Clear the letter input field
  letterInputElem.value = "";
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
