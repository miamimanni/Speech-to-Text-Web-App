// Hardcoded words
const words = ["example", "apple", "banana", "cherry"];
let currentWordIndex = 0;

// Get elements
const wordPrompt = document.getElementById("word");
const startButton = document.getElementById("start-button");
const result = document.getElementById("result");

// Display the first word
wordPrompt.textContent = words[currentWordIndex];

// Set up speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  startButton.addEventListener("click", () => {
    result.textContent = "Listening...";
    recognition.start();
  });

  recognition.onresult = (event) => {
    const spokenWord = event.results[0][0].transcript.toLowerCase();
    if (spokenWord === words[currentWordIndex]) {
      result.textContent = `Correct! You said "${spokenWord}".`;
      currentWordIndex = (currentWordIndex + 1) % words.length; // Move to the next word
      wordPrompt.textContent = words[currentWordIndex];
    } else {
      result.textContent = `Incorrect. You said "${spokenWord}". Try again!`;
    }
  };

  recognition.onerror = (event) => {
    result.textContent = `Error: ${event.error}`;
  };
} else {
  result.textContent = "Speech recognition is not supported on this device.";
}
