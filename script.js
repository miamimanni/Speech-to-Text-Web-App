// Hardcoded words
const words = ["example", "apple", "banana", "cherry"];
let currentWordIndex = 0;

// Get elements
const wordPrompt = document.getElementById("word");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const result = document.getElementById("result");

// Display the first word
wordPrompt.textContent = words[currentWordIndex];

// Set up speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  // Start listening
  startButton.addEventListener("click", () => {
    result.textContent = "Listening...";
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  });

  // Stop listening
  stopButton.addEventListener("click", () => {
    recognition.stop();
    result.textContent = "Stopped listening.";
    startButton.disabled = false;
    stopButton.disabled = true;
  });

  // Handle speech recognition results
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

  // Handle errors
  recognition.onerror = (event) => {
    result.textContent = `Error: ${event.error}`;
    startButton.disabled = false;
    stopButton.disabled = true;
  };

  // Stop recognition when finished
  recognition.onend = () => {
    startButton.disabled = false;
    stopButton.disabled = true;
  };
} else {
  result.textContent = "Speech recognition is not supported on this device.";
  startButton.disabled = true;
  stopButton.disabled = true;
}
