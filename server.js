const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const openai = new OpenAIApi(new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
}));

app.use(express.static('public'));

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
        });

        ws.send(response.data.choices[0].text.trim());
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
