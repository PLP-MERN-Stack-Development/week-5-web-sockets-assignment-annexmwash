const users = {};
const rooms = {};
const messages = {};

function handleSocketEvents(io, socket) {
  // User authentication (username-based)
  socket.on('login', ({ username }, callback) => {
    if (!username || Object.values(users).find(u => u.username === username)) {
      return callback({ success: false, message: 'Username taken or invalid.' });
    }
    users[socket.id] = { username, online: true };
    socket.username = username;
    io.emit('presence', getOnlineUsers());
    callback({ success: true, username });
  });

  // Join room
  socket.on('joinRoom', ({ room }, callback) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = [];
    if (!messages[room]) messages[room] = [];
    rooms[room].push(socket.id);
    callback({ success: true, messages: messages[room] });
    io.to(room).emit('notification', { message: `${socket.username} joined ${room}` });
  });

  // Leave room
  socket.on('leaveRoom', ({ room }) => {
    socket.leave(room);
    if (rooms[room]) {
      rooms[room] = rooms[room].filter(id => id !== socket.id);
      io.to(room).emit('notification', { message: `${socket.username} left ${room}` });
    }
  });

  // Send message
  socket.on('sendMessage', ({ room, content, timestamp, emoji }, callback) => {
    const msg = {
      sender: socket.username,
      content,
      emoji,
      timestamp,
      readBy: [socket.username]
    };
    messages[room].push(msg);
    io.to(room).emit('newMessage', msg);
    callback && callback({ success: true });
  });

  // Typing indicator
  socket.on('typing', ({ room, isTyping }) => {
    socket.to(room).emit('typing', { username: socket.username, isTyping });
  });

  // Read receipts
  socket.on('readMessages', ({ room, username }) => {
    if (messages[room]) {
      messages[room].forEach(msg => {
        if (!msg.readBy.includes(username)) {
          msg.readBy.push(username);
        }
      });
      io.to(room).emit('readReceipts', { room, username });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      delete users[socket.id];
      io.emit('presence', getOnlineUsers());
    }
  });
}

function getOnlineUsers() {
  return Object.values(users).map(u => ({ username: u.username, online: u.online }));
}

module.exports = { handleSocketEvents }; 