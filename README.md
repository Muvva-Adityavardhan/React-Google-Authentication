# 🛠️ Full Stack Project Setup Guide

This guide will help you set up the backend and frontend of the project.

---

## 📦 Backend Setup

### 1. Install Dependencies

Navigate to the `backend` folder and run:

```bash
npm install
```

### 2. Configure Environment Variables

In the `backend` folder, create a `.env` file and add the following variables:

```env
BACKEND_PORT=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=a_very_long_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 💻 Frontend Setup

### 1. Install Dependencies

Navigate to the `frontend` folder and run:

```bash
npm install
```

### 2. Configure Environment Variables

In the `frontend` folder, create a `.env` file and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

✅ Once both backend and frontend are set up, you're ready to run the application locally!
