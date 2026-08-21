# MERN Registration App — Comprehensive Development Plan & Guide

---

## Overview
This document outlines the step-by-step development plan with exact terminal commands for building a simple Signup/Login MERN application (React with Vite, Express, Node.js, and MongoDB) that redirects to a success page upon authentication.

> **Note:** This is a live document. Any updates, preferences, or additions discussed during our sessions will be updated directly in this plan.

---

## Phase 1: Project Setup & Monorepo Structure

### Step 1.1: Folder & Version Control Setup
- **Goal:** Set up clean monorepo folder layout and version control.
- **Commands to run in `c:\My Projects\Test`:**
  ```bash
  # 1. Create frontend folder
  mkdir frontend

  # 2. Initialize Git repo
  git init

  # 3. Create .gitignore file
  touch .gitignore
  ```
- **File:** `c:\My Projects\Test\.gitignore`
  ```gitignore
  node_modules/
  .env
  dist/
  build/
  .DS_Store
  Thumbs.db
  *.log
  ```
- **Verification:** Run `ls -la` to confirm `backend/`, `frontend/`, `.gitignore`, and `.git/` exist.

---

## Phase 2: Backend Development (Node / Express / MongoDB)

### Step 2.1: Server Initialization & Dependencies
- **Goal:** Set up an Express server listening on a configurable port.
- **Commands to run in `c:\My Projects\Test\backend`:**
  ```bash
  cd backend

  # Install core dependencies (if not already installed)
  npm install express cors dotenv mongoose

  # Install dev dependency for auto-restarting server
  npm install -D nodemon
  ```
- **Files to create:**
  - `backend/.env`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/mern-auth
    ```
  - `backend/server.js`: Express server boilerplate listening on `PORT`.
- **Scripts in `backend/package.json`:**
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```
- **Verification:** Run `npm run dev` in `backend/` and verify server starts on port 5000.

### Step 2.2: Database Connection
- **Goal:** Connect Express application to MongoDB.
- **Tasks:**
  - Update `backend/server.js` (or create `backend/config/db.js`) using Mongoose: `mongoose.connect(process.env.MONGO_URI)`.
  - Log successful connection or error on failure.
- **Verification:** Start backend server and verify "Connected to MongoDB" message in terminal.

### Step 2.3: User Data Model
- **Goal:** Define user schema for database.
- **File to create:** `backend/models/User.js`
  - Fields: `name` (String, required), `email` (String, required, unique), `password` (String, required), `timestamps`.

### Step 2.4: Authentication Controller & Routes
- **Goal:** Create backend API endpoints for registration and login.
- **File to create:** `backend/routes/auth.js`
  - `POST /api/auth/register`:
    - Validate inputs (`name`, `email`, `password`).
    - Check if email already registered.
    - Save user to MongoDB.
    - Return `201 Created` with sanitized user object.
  - `POST /api/auth/login`:
    - Find user by email.
    - Compare passwords.
    - Return `200 OK` with user object.
- **Update:** Mount router in `server.js`: `app.use('/api/auth', authRoutes)`.
- **Verification:** Test endpoints using Postman, Thunder Client, or cURL:
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"123456\"}"
  ```

---

## Phase 3: Frontend Development (React + Vite)

### Step 3.1: React App Scaffolding & Dependencies
- **Goal:** Initialize React application inside `frontend/`.
- **Commands to run in `c:\My Projects\Test\frontend`:**
  ```bash
  cd frontend

  # Scaffold React project using Vite template
  npm create vite@latest . -- --template react

  # Install project dependencies
  npm install
  npm install axios react-router-dom
  ```
- **Verification:** Run `npm run dev` in `frontend/` and open `http://localhost:5173`.

### Step 3.2: Routing Setup
- **Goal:** Define application page routes.
- **File to update:** `frontend/src/App.jsx`
  - Wrap app with `BrowserRouter` from `react-router-dom`.
  - Routes:
    - `/` → Signup page
    - `/login` → Login page
    - `/success` → Success / Welcome page

### Step 3.3: UI Components & Form Pages
- **Goal:** Build form UI components and page state.
- **Files to create:**
  - `frontend/src/components/FormInput.jsx` — Reusable labeled input field.
  - `frontend/src/pages/Signup.jsx` — Signup form component (`name`, `email`, `password`).
  - `frontend/src/pages/Login.jsx` — Login form component (`email`, `password`).
  - `frontend/src/pages/Success.jsx` — Welcome screen displaying user info from location state.

### Step 3.4: Styling
- **Goal:** Clean, responsive, centered form styling.
- **File to update:** `frontend/src/App.css`
  - Centered flex box, form card container, styled inputs, primary button styles, error message text.

---

## Phase 4: Full-Stack Integration

### Step 4.1: Vite Dev Server Proxy Configuration
- **Goal:** Avoid CORS issues and full host URLs during local development.
- **File to update:** `frontend/vite.config.js`
  ```javascript
  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:5000'
      }
    }
  });
  ```

### Step 4.2: Connecting React Forms to Backend API
- **Goal:** Enable end-to-end user registration and login flows.
- **Tasks:**
  - Update `Signup.jsx`: On submit, send `axios.post('/api/auth/register', formData)`. On success, navigate to `/success` with user payload. On error, display message.
  - Update `Login.jsx`: On submit, send `axios.post('/api/auth/login', formData)`. On success, navigate to `/success`. On error, display message.

---

## Phase 5: Verification & End-to-End Testing

### Step-by-Step Test Checklist:
- [ ] **Backend Start:** `cd backend && npm run dev` (Server on 5000, MongoDB connected).
- [ ] **Frontend Start:** `cd frontend && npm run dev` (App on 5173).
- [ ] **Signup Test:** Fill form → Submit → Redirect to `/success` displaying user name/email.
- [ ] **Database Check:** Verify new document exists in MongoDB `users` collection.
- [ ] **Duplicate Email Test:** Try registering same email → Verify error message displays on UI.
- [ ] **Login Test:** Navigate to `/login` → Submit credentials → Redirect to `/success`.
