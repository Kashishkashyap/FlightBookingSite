const http = require('http');
const socketIo = require('socket.io');

let io;

// Initializes Socket.io on the given server.

const initializeSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIo
};
