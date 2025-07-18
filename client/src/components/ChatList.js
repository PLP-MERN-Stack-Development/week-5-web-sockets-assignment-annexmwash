import React, { useState } from 'react';

export default function ChatList({ rooms, onJoinRoom, onStartPrivateChat, currentUser, onlineUsers }) {
  const [roomName, setRoomName] = useState('');
  const [privateUser, setPrivateUser] = useState('');

  return (
    <div className="chat-list">
      <h3>Chat Rooms</h3>
      <ul>
        {rooms.map(room => (
          <li key={room}>
            <button onClick={() => onJoinRoom(room)}>{room}</button>
          </li>
        ))}
      </ul>
      <form onSubmit={e => { e.preventDefault(); onJoinRoom(roomName); setRoomName(''); }}>
        <input
          type="text"
          placeholder="New room name"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <button type="submit">Join/Create Room</button>
      </form>
      <h3>Private Chat</h3>
      <form onSubmit={e => { e.preventDefault(); onStartPrivateChat(privateUser); setPrivateUser(''); }}>
        <select value={privateUser} onChange={e => setPrivateUser(e.target.value)}>
          <option value="">Select user</option>
          {onlineUsers.filter(u => u.username !== currentUser).map(u => (
            <option key={u.username} value={u.username}>{u.username}</option>
          ))}
        </select>
        <button type="submit" disabled={!privateUser}>Start Private Chat</button>
      </form>
    </div>
  );
} 