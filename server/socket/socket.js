const { Server } = require('socket.io');
const { handleSocketEvents } = require('../controllers/chatController');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    handleSocketEvents(io, socket);
  });
}

module.exports = { setupSocket }; 