import React from 'react';

export default function MessageInput({ value, onChange, onSend, onEmojiSelect, emoji }) {
  return (
    <form className="message-input" onSubmit={onSend}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
        autoComplete="off"
      />
      <button type="submit">Send</button>
      <button type="button" onClick={onEmojiSelect}>😊</button>
      {emoji && <span className="emoji-preview">{emoji}</span>}
    </form>
  );
} 