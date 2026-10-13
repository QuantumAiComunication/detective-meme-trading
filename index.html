// 1. Send a message from the Website to Pythonista
function sendToPythonista(messageText) {
    const messageRef = database.ref('botMessages').push();
    messageRef.set({
        sender: "Website",
        message: messageText,
        timestamp: Date.now()
    }).then(() => {
        console.log("Message sent to Pythonista!");
    }).catch((error) => {
        console.error("Error sending message:", error);
    });
}

// 2. Listen for replies from Pythonista in real time
function listenForPythonistaReplies() {
    const messagesRef = database.ref('botMessages').limitToLast(20);
    messagesRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        if (data && data.sender === "Pythonista") {
            // Display Pythonista's feedback on your website UI
            displayMessageOnWebUI("Pythonista Bot", data.message);
        }
    });
}

// Call the listener when your web page loads
window.onload = function() {
    listenForPythonistaReplies();
};
