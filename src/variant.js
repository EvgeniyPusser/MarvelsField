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
let guessedWord = []; // Store guessed word during the game
let remainingAllowedGuesses = 0; // Track allowed guesses (30% of word length)
let revealedLettersCount = 0; // Track the number of revealed letters

// References to DOM elements
const definitionElem = document.getElementById("definition");
const wordDisplayElem = document.getElementById("word-display");
const letterInputElem = document.getElementById("letter-input");
const wordInputElem = document.getElementById("word-input");
const attemptsElem = document.getElementById("attempts");
const gameMessageElem = document.getElementById("game-message");
const guessButton = document.getElementById("guess-button");
const remainingLetterCountElem = document.getElementById(
  "remaining-letter-count"
);
document.getElementById("remaining-letter-count").textContent =
  remainingLetterInputs;
const playAgainButton = document.getElementById("play-again");
const letterCountElem = document.getElementById("letter-count");



function startGame() {
  // Select a random word
  const randomEntry = words[Math.floor(Math.random() * words.length)];
  selectedWord = Object.keys(randomEntry)[0]; // The word to guess
  displayedWord = Array(selectedWord.length).fill("⬛"); // Black squares
  maxLetterInputs = Math.floor(selectedWord.length * 0.3); // 30% of word length, floored
  // Tracks how many guesses are left
  remainingLetterInputs = Math.max(1, Math.floor(selectedWord.length * 0.3));
  document.getElementById("remaining-letter-count").textContent =
    remainingLetterInputs;
  
  remainingAttempts = maxLetterInputs; // Also use this for attempt tracking

  // Update UI
  definitionElem.textContent = randomEntry[selectedWord]; // Show definition
  wordDisplayElem.textContent = displayedWord.join(" "); // Show hidden word
  attemptsElem.textContent = remainingAttempts; // Show attempts left
  updateLetterCount(); // Update letter count display

  // Reset Inputs
  letterInputElem.value = "";
  wordInputElem.value = "";
  wordInputElem.readOnly = true; // Lock full word input initially
  letterInputElem.disabled = false; // Enable letter input
  gameMessageElem.textContent = ""; // Clear messages
}

// Update the remaining letter input count
function updateLetterCount() {
  document.getElementById(
    "remaining-letter-count"
  ).textContent = `Remaining letters you can input: ${remainingLetterInputs} (max: ${maxLetterInputs})`;
}

// Handle Letter Input
function handleLetterInput() {
  if (remainingLetterInputs <= 0) {
    gameMessageElem.textContent =
      "⚠️ No more individual letter inputs allowed! Guess the full word.";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = false; // Unlock full word input
    return;
  }

  const letter = letterInputElem.value.toLowerCase();
  if (!letter) return;

  let correctGuess = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].toLowerCase() === letter) {
      displayedWord[i] = selectedWord[i]; // Preserve original letter case
      correctGuess = true;
    }
  }

  // Reduce remaining letter inputs on every guess
  remainingLetterInputs--;

  // Update UI
  wordDisplayElem.textContent = displayedWord.join(" ");
  attemptsElem.textContent = remainingLetterInputs;
  document.getElementById("remaining-letter-count").textContent =
    remainingLetterInputs;

  // Check win/loss conditions
  if (!displayedWord.includes("⬛")) {
    gameMessageElem.textContent = "🎉 Congratulations! You guessed the word!";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = true;
  } else if (remainingLetterInputs === 0) {
    gameMessageElem.textContent = "❌ Out of attempts! Guess the full word.";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = false; // Allow full word input
  }

  letterInputElem.value = ""; // Clear the input field
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
