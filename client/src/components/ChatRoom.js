import React, { useEffect, useRef } from 'react';

export default function ChatRoom({
  room,
  messages,
  onSendMessage,
  onLeaveRoom,
  currentUser,
  typingUsers,
  onlineUsers,
  onTyping,
  onReadMessages,
  emojiPicker,
  onEmojiSelect
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    onReadMessages();
    // eslint-disable-next-line
  }, [messages]);

  return (
    <div className="chat-room">
      <div className="chat-room-header">
        <h2>{room}</h2>
        <button onClick={onLeaveRoom}>Leave Room</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message${msg.sender === currentUser ? ' own' : ''}`}>
            <span className="sender">{msg.sender}</span>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            <span className="content">{msg.content} {msg.emoji}</span>
            <span className="read-by">{msg.readBy && msg.readBy.length > 1 ? `Read by: ${msg.readBy.join(', ')}` : ''}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="typing-indicator">
        {typingUsers.length > 0 && (
          <span>{typingUsers.join(', ')} typing...</span>
        )}
      </div>
      <div className="online-users">
        <strong>Online:</strong> {onlineUsers.map(u => u.username).join(', ')}
      </div>
      {emojiPicker}
      <form className="message-input" onSubmit={onSendMessage}>
        <input type="text" name="message" placeholder="Type a message..." autoComplete="off" onChange={onTyping} />
        <button type="submit">Send</button>
        <button type="button" onClick={onEmojiSelect}>😊</button>
      </form>
    </div>
  );
} 