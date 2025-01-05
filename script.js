const words = ["apple", "banana", "cherry", "date", "fig"]; // Hardcoded words
let currentWordIndex = 0;

const wordPrompt = document.getElementById("word-prompt");
const feedback = document.getElementById("feedback");
const startButton = document.getElementById("start-button");
const speechInput = document.getElementById("speech-input");

// Function to clear the text box every 1.5 seconds
function clearInputPeriodically() {
  setInterval(() => {
    console.log("clearing input box")
    speechInput.value = ""; // Clear input field
  }, 1000); // Interval of 1.5 seconds
}

// Function to prompt the next word
function nextWord() {
  if (currentWordIndex < words.length) {
    const word = words[currentWordIndex];
    wordPrompt.textContent = `Say the word: "${word}"`;
    feedback.textContent = "";
    speechInput.value = ""; // Clear input field
    speechInput.focus(); // Ensure it captures input
  } else {
    wordPrompt.textContent = "You've completed all words!";
    feedback.textContent = "Great job!";
    startButton.textContent = "Restart";
    startButton.style.display = "inline-block";
    currentWordIndex = 0; // Reset for next session
  }
}

// Event listener for start button
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  nextWord();
});

// Triggered when the user finishes speaking
speechInput.addEventListener("input", () => {
  const userInput = speechInput.value.trim().toLowerCase();
  const targetWord = words[currentWordIndex].toLowerCase();

  if (userInput === targetWord) {
    feedback.textContent = "Correct! ✅";
    feedback.style.color = "green";
    currentWordIndex++;
    setTimeout(nextWord, 2000); // Move to next word after 2 seconds
  } else {
    feedback.textContent = "Try again! ❌";
    feedback.style.color = "red";
  }
});

// Start clearing the input field every 1.5 seconds
clearInputPeriodically();
