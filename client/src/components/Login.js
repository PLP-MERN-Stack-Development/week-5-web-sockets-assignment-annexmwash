import React, { useState } from 'react';
import { connectSocket, getSocket } from '../socket/socket';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = connectSocket();
    socket.emit('login', { username }, (response) => {
      if (response.success) {
        onLogin(username);
      } else {
        setError(response.message);
      }
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
} 