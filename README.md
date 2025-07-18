# Real-Time Chat Application with Socket.io

## 🚀 Overview
A full-stack real-time chat application built with React (client) and Node.js/Express + Socket.io (server). Supports multiple chat rooms, private messaging, user authentication, presence tracking, and advanced chat features.

---

## ✨ Features

### Core Features
- Real-time messaging with Socket.io
- User authentication (username-based)
- Presence tracking (online/offline)
- Multiple chat rooms and private messages
- Real-time notifications

### Advanced Features
- Typing indicators
- Read receipts
- Message timestamps
- Online/offline status
- Emoji support

---

## 🗂️ Folder Structure
```
week-5-web-sockets-assignment-annexmwash/
  ├── client/           # React front-end
  │   └── src/
  │       ├── socket/   # Socket.io client setup
  │       ├── components/ # React components
  │       ├── App.js
  │       ├── index.js
  │       └── index.css
  ├── server/           # Node.js/Express back-end
  │   ├── controllers/  # Socket event handlers
  │   ├── socket/       # Socket.io server setup
  │   └── server.js
  ├── README.md         # This file
  └── Week5-Assignment.md
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js v18+
- npm (or yarn)

### 1. Clone the Repository
```
git clone <your-repo-url>
cd week-5-web-sockets-assignment-annexmwash
```

### 2. Install Dependencies
```
cd server && npm install
cd ../client && npm install
```

### 3. Start the Server
```
cd server
node server.js
```

### 4. Start the Client
```
cd ../client
npm start
```

- The client will run on [http://localhost:3000](http://localhost:3000) (or [http://localhost:5173](http://localhost:5173) if using Vite)
- The server runs on [http://localhost:5000](http://localhost:5000)

---

## 🧩 Usage
1. Open the client in your browser.
2. Enter a unique username to log in.
3. Join an existing chat room, create a new one, or start a private chat.
4. Send messages, use emoji, see who is online, and enjoy real-time features!

---

## 📸 Screenshots / GIFs
> _Add screenshots or GIFs of your app in action here!_

---

## 🌐 Deployment
- You can deploy the server to platforms like Heroku, Render, or Railway.
- The client can be deployed to Netlify, Vercel, or GitHub Pages.
- Update the `SERVER_URL` in `client/src/socket/socket.js` if deploying to production.

---

## 🙌 Credits
- Built for the Week 5 Web Sockets Assignment
- Powered by [React](https://reactjs.org/) and [Socket.io](https://socket.io/)

---

## 📄 Assignment
See `Week5-Assignment.md` for the original assignment instructions. 