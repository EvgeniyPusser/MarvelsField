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
let maxLetterInputs = 0; // 30% ceiling of word length

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
const playAgainButton = document.getElementById("play-again");
const letterCountElem = document.getElementById("letter-count");

function startGame() {
  // Select a random word
  const randomEntry = words[Math.floor(Math.random() * words.length)];
  selectedWord = Object.keys(randomEntry)[0]; // The word to guess
  displayedWord = Array(selectedWord.length).fill("⬛"); // Black squares

  // Calculate max letter guesses (30% ceil of word length)
  maxLetterInputs = Math.max(1, Math.ceil(selectedWord.length * 0.3));
  remainingAttempts = Math.max(1, Math.ceil(selectedWord.length + 1)); // Tracks how many guesses are left
  remainingLetterCountElem.textContent = `Remaining letters you can input: ${maxLetterInputs})`;

  // Update UI
  definitionElem.textContent = randomEntry[selectedWord];
  wordDisplayElem.textContent = displayedWord.join(" ");
  attemptsElem.textContent = remainingAttempts;
  updateLetterCount();

  // Reset Inputs
  letterInputElem.value = "";
  wordInputElem.value = "";
  wordInputElem.readOnly = true;
  letterInputElem.disabled = false;
  gameMessageElem.textContent = "";
  playAgainButton.style.display = "none";
}

// Update the remaining letter input count
function updateLetterCount() {
  remainingLetterCountElem.textContent = `Remaining letters you can input: ${maxLetterInputs}`;
}

// Handle Letter Input
function handleLetterInput() {
  if (remainingAttempts <= 0) {
    gameMessageElem.textContent =
      "⚠️ No more individual letter inputs allowed! Guess the full word.";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = false;
    return;
  }

  const letter = letterInputElem.value.toLowerCase();
  if (!letter) return;

  let correctGuess = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].toLowerCase() === letter) {
      displayedWord[i] = selectedWord[i]; // Keep original case
      correctGuess = true;
    }
  }

  remainingAttempts--;
  maxLetterInputs--;
  remainingLetterCountElem.textContent = `Remaining letters you can input: ${maxLetterInputs}`;

  // Update UI
  wordDisplayElem.textContent = displayedWord.join(" ");
  attemptsElem.textContent = remainingAttempts;
  updateLetterCount();

  if (!displayedWord.includes("⬛")) {
    gameMessageElem.textContent = "🎉 Congratulations! You guessed the word!";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = true;
  } else if (remainingAttempts === 0) {
    gameMessageElem.textContent = "❌ Out of attempts! Guess the full word.";
    letterInputElem.disabled = true;
    wordInputElem.readOnly = false;
  }

  letterInputElem.value = "";
}

// Enable full word input
// function enableWordInput() {
//   wordInputElem.readOnly = false;
//   letterInputElem.disabled = true;
//   guessButton.disabled = true;
//   gameMessageElem.textContent = "Enter your final guess!";
// }

function enableWordInput() {
  wordInputElem.readOnly = false;
  letterInputElem.disabled = true;
  guessButton.disabled = false; // ✅ ALLOW button click!
  gameMessageElem.textContent = "Enter your final guess!";
}


// Handle full word guess
wordInputElem.addEventListener("change", function () {
  const userGuess = wordInputElem.value.trim().toLowerCase();
  const targetWord = selectedWord.toLowerCase();

  if (userGuess === targetWord) {
    gameMessageElem.textContent = "🎉 Correct! You won!";
  } else {
    gameMessageElem.textContent = `❌ Wrong! The word was: ${selectedWord}`;
  }

  playAgainButton.style.display = "block";
});

