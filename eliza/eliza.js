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

// Reflections for personalizing responses
const reflections = {
    "i am": "you are",
    "i'm": "you are",
    "i": "you",
    "my": "your",
    "me": "you",
    "am": "are",
    "you are": "I am",
    "your": "my",
    "you": "I"
};

// Function to reflect user input for more personalized responses
function reflect(input) {
    return input.toLowerCase().replace(/\b(i am|i'm|my|me|am|you are|your|you)\b/g, matched => reflections[matched]);
}

// Patterns and responses to expand ELIZA's coverage
const responsePatterns = [
    { pattern: /\b(hello|hi|hey)\b/i, responses: ["Hello! How can I help you today?", "Hi there! What's on your mind?", "Hey! How are you feeling?"] },
    { pattern: /\b(i feel|i am feeling)\b.*\b(sad|down|depressed|unhappy)\b/i, responses: ["I'm sorry to hear that. Can you tell me more?", "What's making you feel this way?", "I'm here to listen. What's on your mind?"] },
    { pattern: /\b(i need|i want|help|advice)\b/i, responses: ["I'm here to help. Please tell me more.", "What kind of support are you looking for?", "Feel free to share. I'm listening."] },
    { pattern: /\b(because|since)\b/i, responses: ["Can you explain why?", "Do you think there's another reason?", "How do you feel about that?"] },
    { pattern: /\b(i think)\b/i, responses: ["Why do you think that?", "What makes you say that?", "Could you elaborate on that?"] },
    { pattern: /\b(you are|you're)\b/i, responses: ["Why do you say that I am?", "What makes you feel that way about me?", "Interesting. Tell me more."] },
    { pattern: /\b(family|friend|relationship|partner|mother|father)\b/i, responses: ["Tell me more about your family.", "How do you feel about them?", "It sounds important. What more can you tell me?"] },
    { pattern: /\b(yes|no)\b/i, responses: ["Why do you feel that way?", "Can you explain more?", "What makes you say that?"] },
    { pattern: /\b(thank you|thanks)\b/i, responses: ["You're welcome! Is there anything else on your mind?", "Glad to help! What's next?", "I'm here for you. Anything else?"] }
];

// Get a response based on the pattern
function getElizaResponse(input) {
    for (let i = 0; i < responsePatterns.length; i++) {
        const { pattern, responses } = responsePatterns[i];
        if (pattern.test(input)) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return randomResponse.replace("your", "your").replace(/(i feel|i am|i think)\b/i, reflect(input));
        }
    }

    // Default fallback response if no patterns match
    return "I'm here to listen. Tell me more.";
}