# MERN Notes App

A simple full-stack Notes application built using the MERN stack.

## Features

- Create notes
- View all notes
- Update notes
- Delete notes
- MongoDB Atlas integration
- REST API
- MVC backend architecture
- React frontend
- Axios API handling
- Environment variables support

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

# Project Structure

```txt
simple-note/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    ├── .env
    ├── package.json
    └── vite.config.js
```

## Installation

Clone Repository
```bash 
git clone YOUR_REPOSITORY_URL
```

## Backend Setup
Navigate to backend
```bash 
cd backend
```
Install dependencies

```bash
npm install
```

Create `.env`
```txt
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```
Start backend server  
```bash 
npm run dev
```
Frontend Setup
Navigate to frontend
```bash 
cd frontend
```
Install dependencies
```bash 
npm install
```
Create `.env`
```txt 
VITE_API_URL=http://localhost:5000
```
Start frontend server
```bash 
npm run dev
```
| Method | Route       | Description     |
|--------|-------------|-----------------|
| GET    | /notes      | Get all notes   |
| GET    | /notes/:id  | Get single note |
| POST   | /notes      | Create note     |
| PUT    | /notes/:id  | Update note     |
| DELETE | /notes/:id  | Delete note     |

## Author
Hariharasudhan