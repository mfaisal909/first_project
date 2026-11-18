# Task Manager (MERN)

A simple Task Manager built with MongoDB, Express, React, and Node.js.

## Folder Structure

```
task-manager/
  frontend/
  backend/
  README.md
  .gitignore
```

## Installation

Backend:
```
cd backend
npm install
cp .env.example .env
```
Frontend:
```
cd frontend
npm install
cp .env.example .env
```

## Local Development

Backend:
```
npm run dev
```
Frontend:
```
npm run dev
```

## MongoDB Atlas Configuration

1. Create a free cluster on MongoDB Atlas.
2. Create a database user and allow network access (0.0.0.0/0 for dev).
3. Get the connection string and set `MONGODB_URI` in `backend/.env`.

## Frontend Production Build
```
cd frontend
npm run build
```

## Backend Production Start
```
cd backend
npm start
```

## AWS EC2 Deployment Instructions

Frontend (Instance 1, Ubuntu):
1. Install Node.js and Nginx.
2. Clone repo, `cd frontend`, `npm install`, `npm run build`.
3. Serve `dist/` with Nginx (root `/var/www/task-manager`).
4. Set `VITE_API_BASE_URL` to backend public URL before build.

Backend (Instance 2, Ubuntu):
1. Install Node.js and PM2.
2. Clone repo, `cd backend`, `npm install`.
3. Create `.env` with `PORT=5000`, `MONGODB_URI`, `CLIENT_ORIGIN`.
4. Start with `pm2 start src/server.js --name task-api`.
5. Open port 5000 in security group.

Database: MongoDB Atlas with `MONGODB_URI`.
