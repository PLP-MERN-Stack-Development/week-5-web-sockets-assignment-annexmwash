import React from 'react';

const emojis = ['😀', '😂', '😍', '😎', '😭', '👍', '🎉', '🔥', '❤️', '😡'];

export default function EmojiPicker({ onSelect }) {
  return (
    <div className="emoji-picker">
      {emojis.map(emoji => (
        <button key={emoji} onClick={() => onSelect(emoji)}>{emoji}</button>
      ))}
    </div>
  );
} 