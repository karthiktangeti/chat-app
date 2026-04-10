# Chat App

Real-time full-stack chat platform built with the MERN ecosystem and Socket.IO, including authentication, instant messaging, typing indicators, seen status, and WebRTC call signaling.

## Why This Project

This app demonstrates end-to-end product engineering skills:

- Building secure auth flows with JWT
- Managing real-time bidirectional events with Socket.IO
- Designing scalable API routes with Express + MongoDB
- Integrating WebRTC call signaling for voice/video communication
- Handling profile media upload with Cloudinary

## Core Features

- Account creation and login
- Protected routes with token-based authentication
- One-to-one chat
- Online/offline user presence
- Typing and stop-typing indicators
- Seen receipts for messages
- Voice/video call signaling (offer/answer/ICE)
- Call history retrieval
- Profile update with image upload

## Tech Stack

Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router
- Socket.IO Client
- React Hot Toast

Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT + bcryptjs
- Cloudinary

## Architecture

```text
Chat-app/
  client/    React frontend (UI, auth state, chat state)
  server/    Express API + Socket.IO server + MongoDB models
```

## Local Setup

### 1) Clone

```bash
git clone https://github.com/Maverick-841/Chat-app.git
cd Chat-app
```

### 2) Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 3) Configure environment variables

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### 4) Run in development

Use two terminals:

Terminal A (backend)

```bash
cd server
npm start
```

Terminal B (frontend)

```bash
cd client
npm run dev
```

App URL: http://localhost:5173
API URL: http://localhost:5000

## API Overview

Auth routes
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/check
- PUT /api/auth/update-profile

Message routes
- GET /api/messages/users
- GET /api/messages/:id
- POST /api/messages/send/:id
- PUT /api/messages/mark/:id

Call routes
- GET /api/calls

Health route
- GET /api/status

## Socket Event Flow

- Presence: onlineUsers
- Typing: typing, stop-typing, user-typing, user-stop-typing
- Seen updates: mark-seen, messages-seen
- Calling: call-user, incoming-call, answer-call, call-accepted, reject-call, call-rejected, ice-candidate, end-call, call-ended

## Security Notes

- Never commit real .env secrets.
- If secrets were exposed previously, rotate JWT and Cloudinary keys.
- CORS is configured for local frontend origin during development.

## Roadmap

- Group chat and channels
- Attachments and media messages
- Message pagination
- Unit/integration tests
- Docker-based deployment

## License

MIT
