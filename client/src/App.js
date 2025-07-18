import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';
import EmojiPicker from './components/EmojiPicker';
import { connectSocket, getSocket } from './socket/socket';

const DEFAULT_ROOMS = ['General', 'Random', 'Help'];

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState(DEFAULT_ROOMS);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (!user) return;
    const socket = getSocket();

    socket.on('presence', users => setOnlineUsers(users));
    socket.on('notification', ({ message }) => alert(message));
    socket.on('newMessage', msg => setMessages(msgs => [...msgs, msg]));
    socket.on('typing', ({ username, isTyping }) => {
      setTypingUsers(prev => {
        if (isTyping) {
          return prev.includes(username) ? prev : [...prev, username];
        } else {
          return prev.filter(u => u !== username);
        }
      });
    });
    socket.on('readReceipts', ({ username }) => {
      setMessages(msgs => msgs.map(msg =>
        msg.readBy && !msg.readBy.includes(username)
          ? { ...msg, readBy: [...msg.readBy, username] }
          : msg
      ));
    });
    return () => {
      socket.off('presence');
      socket.off('notification');
      socket.off('newMessage');
      socket.off('typing');
      socket.off('readReceipts');
    };
  }, [user]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleJoinRoom = (room) => {
    if (!room) return;
    const socket = getSocket();
    socket.emit('joinRoom', { room }, ({ success, messages: msgs }) => {
      if (success) {
        setCurrentRoom(room);
        setMessages(msgs);
        if (!rooms.includes(room)) setRooms([...rooms, room]);
      }
    });
  };

  const handleLeaveRoom = () => {
    const socket = getSocket();
    socket.emit('leaveRoom', { room: currentRoom });
    setCurrentRoom('');
    setMessages([]);
    setTypingUsers([]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue && !selectedEmoji) return;
    const socket = getSocket();
    const msg = {
      room: currentRoom,
      content: inputValue,
      emoji: selectedEmoji,
      timestamp: new Date().toISOString()
    };
    socket.emit('sendMessage', msg, () => {
      setInputValue('');
      setSelectedEmoji('');
      setShowEmojiPicker(false);
    });
  };

  const handleTyping = () => {
    const socket = getSocket();
    socket.emit('typing', { room: currentRoom, isTyping: true });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit('typing', { room: currentRoom, isTyping: false });
    }, 1000);
  };

  const handleReadMessages = () => {
    const socket = getSocket();
    socket.emit('readMessages', { room: currentRoom, username: user });
  };

  const handleStartPrivateChat = (otherUser) => {
    if (!otherUser) return;
    const privateRoom = [user, otherUser].sort().join('-');
    handleJoinRoom(privateRoom);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (!currentRoom) {
    return (
      <div className="app-container">
        <h1>Welcome, {user}!</h1>
        <ChatList
          rooms={rooms}
          onJoinRoom={handleJoinRoom}
          onStartPrivateChat={handleStartPrivateChat}
          currentUser={user}
          onlineUsers={onlineUsers}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <ChatRoom
        room={currentRoom}
        messages={messages}
        onSendMessage={handleSendMessage}
        onLeaveRoom={handleLeaveRoom}
        currentUser={user}
        typingUsers={typingUsers}
        onlineUsers={onlineUsers}
        onTyping={handleTyping}
        onReadMessages={handleReadMessages}
        emojiPicker={showEmojiPicker ? <EmojiPicker onSelect={handleEmojiSelect} /> : null}
        onEmojiSelect={() => setShowEmojiPicker(v => !v)}
      />
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button type="submit">Send</button>
        <button type="button" onClick={() => setShowEmojiPicker(v => !v)}>😊</button>
        {selectedEmoji && <span className="emoji-preview">{selectedEmoji}</span>}
      </form>
    </div>
  );
}

export default App; 