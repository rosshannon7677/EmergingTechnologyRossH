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

