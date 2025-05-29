
# 🧠 Social Media Detox System

A full-stack web application designed to help users monitor and control their daily social media usage. Users can register, log in, set screen time limits, update their profile, and stay focused with personalized detox goals.

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 👤 User Profile Management (View & Update)
- ⏱️ Set Daily Screen Time Limits
- 🎯 Add Personal Detox Goals
- ☁️ Real-time Data Stored in MongoDB

---

## 🛠️ Technologies Used

### ⚙️ Frontend

- **React.js** – Component-based UI
- **Vite** – Fast frontend build tool
- **TypeScript** – Typed JavaScript for better maintainability
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – HTTP requests to the backend
- **React Router** – Client-side routing

### 🔧 Backend

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM for Node.js

### 🧰 Development Tools

- **Visual Studio Code (VS Code)**
- **Postman** – API testing
- **Nodemon** – Auto-restart backend server

---

## 📂 Project Structure

```bash
social-media-detox/
├── client/             # Frontend (React + Vite + TailwindCSS)
│   └── src/
│       └── pages/
│           ├── Register.tsx
│           ├── Login.tsx
│           └── UserProfile.tsx
├── server/             # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
└── README.md
