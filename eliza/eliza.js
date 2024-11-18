// Function to send the user's message and get a response
function sendMessage() {
    // Get the user's message from the input field, removing extra whitespace
    const userInput = document.getElementById('user-input').value.trim();
    // If the input is empty, don't proceed (prevents empty messages)
    if (userInput === "") return;
    // Display the user's message in the chat history
    displayMessage("User", userInput);
    // Generate ELIZA's response based on the user's input
    const elizaResponse = getElizaResponse(userInput);
    // Display ELIZA's response in the chat history
    displayMessage("ELIZA", elizaResponse);
    // Clear the input field for the next message
    document.getElementById('user-input').value = "";
}

// Function to display a message in the chat history
function displayMessage(sender, message) {
    // Find the chat history element where messages are displayed
    const chatHistory = document.getElementById('chat-history');
    // Create a new paragraph element for the message
    const messageElement = document.createElement('p');
    // Format the message with the sender's name in bold and the message text
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    // Add the message to the chat history
    chatHistory.appendChild(messageElement);
    // Scroll the chat history to the bottom to show the latest message
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Keywords for basic sentiment detection
const positiveWords = ["happy", "good", "excited", "great", "love", "amazing", "fantastic", "joy"];
const negativeWords = ["sad", "bad", "angry", "depressed", "upset", "lonely", "frustrated", "hate"];

// Function to detect sentiment based on keywords
function detectSentiment(input) {
    // Convert input to lowercase for case-insensitive matching
    input = input.toLowerCase();

    // Check for positive words
    if (positiveWords.some(word => input.includes(word))) {
        return "positive";
    }

    // Check for negative words
    if (negativeWords.some(word => input.includes(word))) {
        return "negative";
    }

    // Default to neutral if no sentiment keywords are found
    return "neutral";
}


// Dictionary of reflections for personalizing ELIZA's responses
// Maps certain words in user input to alternative words for ELIZA's response
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
// This function replaces certain words in the user's input with words from the reflections dictionary
function reflect(input) {
    // Convert the input to lowercase and replace words based on the reflections dictionary
    return input.toLowerCase().replace(/\b(i am|i'm|my|me|am|you are|your|you)\b/g, matched => reflections[matched]);
}

// Array of patterns and responses to expand ELIZA's coverage
// Each object contains a regex pattern to match against user input and a list of possible responses
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

// Function to get ELIZA's response based on user input
function getElizaResponse(input) {
    // Detect the sentiment of the user's input
    const sentiment = detectSentiment(input);

    // Respond based on sentiment
    if (sentiment === "positive") {
        return "I'm glad to hear that! Tell me more about it.";
    } else if (sentiment === "negative") {
        return "I'm sorry you're feeling this way. Can you share more about what's troubling you?";
    } 

    // Loop through response patterns if sentiment is neutral
    for (let i = 0; i < responsePatterns.length; i++) {
        const { pattern, responses } = responsePatterns[i];
        if (pattern.test(input)) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return randomResponse.replace("your", "your").replace(/(i feel|i am|i think)\b/i, reflect(input));
        }
    }

    // Default fallback response if no patterns match and sentiment is neutral
    return "I'm here to listen. Tell me more.";
}