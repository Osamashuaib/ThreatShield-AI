'use strict';

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Echo the message back to the client
        ws.send(`You sent: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Route mounting at root level
app.get('/', (req, res) => {
    res.send('Welcome to the ThreatShield AI platform backend!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
