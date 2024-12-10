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
const positiveWords = [
    "happy", "good", "excited", "great", "love", "amazing", "fantastic", "joy", 
    "wonderful", "positive", "proud", "grateful", "cheerful", "content"
];
const negativeWords = [
    "sad", "bad", "angry", "depressed", "upset", "lonely", "frustrated", "hate", 
    "tired", "anxious", "worried", "fearful", "down", "miserable", "hurt", "jealous"
];
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
    // Greetings
    { pattern: /\b(hello|hi|hey)\b/i, responses: ["Hello! How can I assist you?", "Hi there! What's on your mind today?", "Hey! How are you feeling?"] },

    // Sad or negative emotions
    { pattern: /\b(i feel|i am feeling|i'm)\b.*\b(sad|down|depressed|unhappy|lonely|miserable|angry)\b/i, 
      responses: ["I'm sorry you're feeling this way. Would you like to talk about it?", "Can you share more about what's been bothering you?", "I'm here to listen. What's troubling you?"] },

    // Happy or positive emotions
    { pattern: /\b(i feel|i am feeling|i'm)\b.*\b(happy|excited|good|proud|grateful|amazing|great)\b/i, 
      responses: ["That's wonderful to hear! What's making you feel this way?", "I'm glad you're feeling positive! Tell me more.", "That's great news! Can you share more about it?"] },

    // Seeking help or advice
    { pattern: /\b(i need|i want|help|advice|support)\b/i, 
      responses: ["I'm here to help. Can you tell me more about what you need?", "What kind of support are you looking for?", "Feel free to share what's on your mind."] },

    // Expressing confusion or uncertainty
    { pattern: /\b(i don't know|i'm not sure|i can't decide)\b/i, 
      responses: ["That's okay. Can we break it down together?", "What are the options you're considering?", "Sometimes talking through it can help. Let's start with what you're thinking."] },

    // Relationships
    { pattern: /\b(family|friend|relationship|partner|mother|father|siblings)\b/i, 
      responses: ["Tell me more about your relationship with them.", "How do you feel about them?", "It sounds important. Would you like to discuss it further?"] },

    // Reflecting on thoughts
    { pattern: /\b(i think|i believe)\b/i, 
      responses: ["Why do you think that?", "What makes you believe that?", "That's an interesting perspective. Can you explain more?"] },

    // Gratitude
    { pattern: /\b(thank you|thanks|i appreciate)\b/i, 
      responses: ["You're welcome! Is there anything else you'd like to talk about?", "I'm glad I could help. What's on your mind now?", "No problem! Feel free to share more."] },

    // Asking about ELIZA
    { pattern: /\b(who are you|what are you|are you real)\b/i, 
      responses: ["I'm ELIZA, your virtual assistant. How can I help you today?", "I'm here to listen and help. What's on your mind?", "Think of me as a friendly listener. What's bothering you?"] },

    // Generic yes/no responses
    { pattern: /\b(yes|yeah|yep|no|nah)\b/i, 
      responses: ["Why do you feel that way?", "Can you explain more?", "What makes you say that?"] },

    // Exploring "why"
    { pattern: /\b(because|since|why)\b/i, 
      responses: ["Can you elaborate on that?", "Do you think there's another reason?", "How do you feel about that?"] },

    // Expressing frustration
    { pattern: /\b(frustrated|annoyed|irritated|angry)\b/i, 
      responses: ["I'm sorry to hear that. What's causing these feelings?", "Can you explain what's been frustrating you?", "Let's talk through it. What's bothering you most?"] },

    // Talking about hobbies or interests
    { pattern: /\b(hobby|interests|activities|free time)\b/i, 
      responses: ["What do you enjoy doing in your free time?", "Tell me about your hobbies. What makes you happy?", "Do you have any activities that help you relax or feel better?"] },

    // Discussing work or studies
    { pattern: /\b(work|job|study|school|university|career)\b/i, 
      responses: ["How are things going with your work or studies?", "Do you enjoy what you do?", "What challenges have you been facing in this area?"] },

    // Fallback for unmatched input
    { pattern: /.*/, responses: ["I'm here to listen. Can you tell me more?", "That's interesting. Please elaborate.", "Can you explain what you mean in more detail?"] }
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