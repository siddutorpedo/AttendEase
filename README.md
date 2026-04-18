# AttendEase — Student Attendance Management System

A production-ready MERN stack application for managing student attendance with role-based access, real-time analytics, and CSV export.

## Features

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure login for students, teachers, and admins with bcrypt password hashing |
| **Role-Based Access** | Different permissions for admin, teacher, and student roles |
| **Live Attendance** | Mark attendance by year, branch, section, and subject with bulk operations |
| **Analytics Dashboard** | Per-subject attendance breakdown with red highlighting for <75% attendance |
| **CSV Export** | Download attendance reports as CSV files |
| **Admin Console** | Manage students, subjects, and classes with full CRUD |
| **API Security** | Helmet, rate limiting, Joi validation, global error handling |

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router v6
- **Backend**: Node.js, Express 5, Mongoose 9, JWT, bcryptjs
- **Database**: MongoDB
- **Security**: Helmet, express-rate-limit, Joi validation

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
git clone <repo-url>
cd AttendEase

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Setup

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/attendEase
PORT=5000
JWT_SECRET=your_secure_secret_key_here
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

This creates default accounts:
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@attendease.edu | admin123 |
| Teacher | teacher@attendease.edu | teacher123 |

### 4. Run Development

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register new user |
| POST | `/api/v1/auth/login` | No | Login |
| GET | `/api/v1/auth/me` | Yes | Get current user |

### Students
| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/v1/students` | No | — | List students |
| GET | `/api/v1/students/:id` | Yes | Any | Get student |
| DELETE | `/api/v1/students/:id` | Yes | Admin, Teacher | Delete student |

### Subjects
| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/v1/subjects` | No | — | List subjects |
| POST | `/api/v1/subjects` | Yes | Admin, Teacher | Create subject |
| PUT | `/api/v1/subjects/:id` | Yes | Admin, Teacher | Update subject |
| DELETE | `/api/v1/subjects/:id` | Yes | Admin, Teacher | Delete subject |

### Attendance
| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/api/v1/attendance` | Yes | Any | List records |
| POST | `/api/v1/attendance/mark` | Yes | Admin, Teacher | Mark attendance |

> **Legacy routes**: All `/api/v1/*` endpoints are also mirrored at `/api/*` for backward compatibility.

## Project Structure

```
backend/
├── config/db.js              # MongoDB connection
├── constants/roles.js        # Role enum
├── controllers/              # HTTP request handlers
├── middleware/                # Auth, RBAC, validation, errors
├── models/                   # Mongoose schemas
├── routes/v1/                # API v1 routes
├── routes/legacy.js          # Backward compat routes
├── scripts/seed.js           # Database seeder
├── services/                 # Business logic layer
├── utils/ApiError.js         # Custom error class
├── validators/               # Joi validation schemas
└── server.js                 # Entry point

frontend/src/
├── components/               # Reusable UI components
├── contexts/                 # React Context (Auth, Data)
├── layouts/                  # Page layouts
├── pages/                    # Route pages
├── services/                 # API service layer (axios)
└── AppRoutes.jsx             # Route definitions
```

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a Web Service on Render
3. Set environment variables (MONGO_URI with Atlas, JWT_SECRET, CORS_ORIGIN)
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend (Vercel)
1. Import from GitHub
2. Set `VITE_API_URL` to your Render backend URL
3. Build command: `npm run build`
4. Output directory: `dist`

### Database (MongoDB Atlas)
1. Create a free cluster at mongodb.com/atlas
2. Get connection string and update `MONGO_URI`

## Scripts

| Command | Directory | Description |
|---------|-----------|-------------|
| `npm run dev` | backend | Start with nodemon |
| `npm start` | backend | Production start |
| `npm run seed` | backend | Seed admin/teacher accounts |
| `npm run dev` | frontend | Vite dev server |
| `npm run build` | frontend | Production build |

## License

MIT
