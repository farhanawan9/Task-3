

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = `ChatGPT: ${event.data}`;
    chatBox.appendChild(message);
};

sendButton.addEventListener('click', () => {
    const message = userInput.value;
    if (message) {
        const userMessage = document.createElement('div');
        userMessage.textContent = `You: ${message}`;
        chatBox.appendChild(userMessage);

        socket.send(message);
        userInput.value = '';
    }
});