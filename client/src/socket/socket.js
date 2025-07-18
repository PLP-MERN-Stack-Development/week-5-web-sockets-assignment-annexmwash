// socket.js - Socket.io client setup

import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

let socket;

export function connectSocket() {
  if (!socket) {
    socket = io(SERVER_URL);
  }
  return socket;
}

export function getSocket() {
  return socket;
} 