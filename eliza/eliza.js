// Function to send user message and get a response
function sendMessage() {
    // Get the user's message
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === "") return; // Don't process if input is empty

    // Display the user's message
    displayMessage("User", userInput);

    // Get ELIZA's response and display it
    const elizaResponse = getElizaResponse(userInput);
    displayMessage("ELIZA", elizaResponse);

    // Clear the input field for the next message
    document.getElementById('user-input').value = "";
}

// Function to display a message in the chat history
function displayMessage(sender, message) {
    const chatHistory = document.getElementById('chat-history');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
}

// Basic ELIZA logic to return a simple response
function getElizaResponse(input) {
    // Very simple responses based on keywords; can be expanded
    const responses = [
        { pattern: /\bhello\b/i, response: "Hello! How can I help you today?" },
        { pattern: /\b(i need|help|advice)\b/i, response: "I'm here to listen. Please tell me more." },
        { pattern: /\b(sad|depressed|unhappy)\b/i, response: "I'm sorry to hear that. What's making you feel this way?" },
        { pattern: /\bthank(s| you)\b/i, response: "You're welcome! I'm here to help." }
    ];

   
}
