<div align="center">
  <img src="https://via.placeholder.com/150x150?text=AttendEase+Logo" alt="AttendEase Logo" width="120" height="120" />
  <h1>🎓 AttendEase</h1>
  <p><strong>A Modern, Production-Ready Student Attendance Management System</strong></p>

  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-5.2-lightgrey.svg?style=flat&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
</div>

<br />

## 📖 About The Project

**AttendEase** is a full-stack, comprehensive MERN (MongoDB, Express, React, Node.js) application tailored for educational institutions. It streamlines the tracking of student attendance, allowing administrative staff, educators, and students to access and manage attendance records seamlessly with robust role-based access control.

By eliminating manual attendance tracking overhead, AttendEase empowers educators with real-time analytics and dynamic reporting tools, while providing students with quick overviews of their ongoing academic attendance status.

---

## ✨ Key Features

- **🔐 Robust Security & Authentication:** JWT-based stateless authentication wrapped with `bcryptjs` password hashing, `helmet` security headers, and API rate limiting.
- **🛡️ Role-Based Access Control (RBAC):** Distinct hierarchical privileges for **Admin**, **Teacher**, and **Student**.
- **📅 Real-Time Live Attendance:** Instantly log student attendance via intuitive interfaces segmented by Academic Year, Branch, Section, and Subject.
- **📊 Interactive Analytics Dashboard:** Deep-dive statistics showing per-subject attendance percentages, with automatic highlights for students falling below the 75% threshold.
- **📥 One-Click Reports:** Easily export tabular attendance data to CSV files for institutional archiving or offline viewing.
- **⚙️ Full Administrative Control:** Powerful CMS functionalities enabling the management of Student Records, Subject Mapping, and Class/Section assignments.

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Usage |
| :--- | :--- | :--- |
| **Frontend UI** | React 18, Vite, TailwindCSS | Core interface, fast builds, responsive utility-first styling |
| **State & Routing** | Redux Toolkit, React Router v6 | Global state management and declarative routing |
| **Data Fetching** | Axios | Configured API service layer with interceptors |
| **Visualizations** | Recharts, D3 | Rendering engaging analytics charts |
| **Backend API** | Node.js, Express 5.x | High-performance API routing and controller handling |
| **Database & ORM** | MongoDB, Mongoose 9 | NoSQL database with strict Schema validations |
| **Auth & Security** | JWT, bcryptjs, Helmet | Token generation, secure hashing, and HTTP header protection |
| **Validation** | Joi | Express request payload validation |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB** (Local instance running on `mongodb://localhost:27017` or a MongoDB Atlas URI)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AttendEase.git
cd AttendEase
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env
```

**Configure Backend `.env`:**
Create a `.env` file in the `backend/` directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/attendEase
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_me_in_prod
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Seed Default Admin/Teacher Data:**
```bash
# Seeds the database with default admin & teacher accounts
npm run seed
```
*(Default accounts: Admin: `admin@attendease.edu`/`admin123` | Teacher: `teacher@attendease.edu`/`teacher123`)*

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment configuration (if required)
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env
```

### 4. Run the Development Servers

**Run Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Run Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# App will run on http://localhost:5173
```

---

## 📁 Project Architecture

AttendEase follows a scalable MVC-inspired modular architecture.

```text
AttendEase/
├── backend/                  # Express.js REST API
│   ├── config/               # DB connection logic
│   ├── constants/            # Global constants (Roles)
│   ├── controllers/          # Route handlers & request logic
│   ├── middleware/           # Auth, RBAC, error handlers
│   ├── models/               # Mongoose DB Schemas
│   ├── routes/v1/            # API endpoints mapping
│   ├── services/             # Core business logic
│   ├── utils/                # Utility classes (ApiError)
│   ├── validators/           # Joi validation schemas
│   └── server.js             # API entry point
│
└── frontend/                 # React UI
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable UI widgets
    │   ├── contexts/         # React Contexts (Auth)
    │   ├── layouts/          # Dashboard & Main structural layouts
    │   ├── pages/            # View components (Login, Profile, Analytics)
    │   ├── services/         # Axios API clients
    │   ├── store/            # Redux slices (if used)
    │   └── AppRoutes.jsx     # Routing definitions
    └── package.json          # Vite and UI dependencies
```

---

## 🔌 Core API Endpoints

All API endpoints are prefixed with `/api/v1`. A legacy fallback `/api` is also available.

| Scope | HTTP | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/login` | Public | Authenticates user and returns JWT |
| **Auth** | `GET` | `/auth/me` | Logged In | Returns current user profile |
| **Students** | `GET` | `/students` | Logged In | Fetches list of all students |
| **Students** | `DELETE` | `/students/:id` | Admin, Teacher | Deletes a student record |
| **Subjects** | `POST` | `/subjects` | Admin, Teacher | Creates a new subject |
| **Attendance**| `POST` | `/attendance/mark` | Admin, Teacher | Submits bulk attendance logs |
| **Attendance**| `GET` | `/attendance` | Logged In | Retrieves filtered attendance records |

---

## 🚢 Deployment Guidelines

### Backend (e.g., Render, Railway, Heroku)
1. Add a MongoDB Atlas URI to your `MONGO_URI` environment variable.
2. Set `NODE_ENV=production`.
3. Configure `CORS_ORIGIN` to match your deployed frontend domain.
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`

### Frontend (e.g., Vercel, Netlify)
1. Set `VITE_API_URL` to your live backend base URL (e.g., `https://api.attendease.com/api/v1`).
2. Build Command: `npm run build`
3. Publish Directory: `dist`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](#) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <sub>Built with ❤️ by the AttendEase Team</sub>
</div>
