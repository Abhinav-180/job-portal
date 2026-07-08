# 🏢 MERN Stack Job Portal

A full-stack **Job Portal** web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It provides a seamless experience for both **Job Seekers (Students)** and **Recruiters (Admins)** — from posting jobs to applying and tracking application status.

---

## 🚀 Live Demo

🔗 **[https://job-portal-zeta-orcin.vercel.app](https://job-portal-zeta-orcin.vercel.app)**

---

## ✨ Features

### 👨‍🎓 Student / Job Seeker
- Register with profile photo, Aadhar Card & PAN Card verification
- Secure login with role-based authentication
- Browse and search jobs using **keyword search & category filters**
- View detailed job descriptions with company info
- Apply for jobs with one click (duplicate apply prevention)
- Manage and update profile — including **resume upload to Cloudinary**
- View all applied jobs with their current **application status**

### 🧑‍💼 Recruiter / Admin
- Register and create a **company profile** with logo upload
- **Post new job openings** with details like salary, location, job type, experience level
- View all posted jobs on an admin dashboard
- View list of **all applicants** for each job posting
- Update application status: **Pending → Accepted / Rejected**
- Admin routes are fully **protected** — unauthorized users are redirected away

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js 18, Vite, Tailwind CSS, Radix UI |
| **State Management** | Redux Toolkit, Redux Persist |
| **Routing** | React Router DOM v7 |
| **Animations** | Framer Motion |
| **HTTP Client** | Axios (with `withCredentials: true`) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens) + HTTP-only Cookies |
| **Password Security** | Bcrypt.js |
| **File Uploads** | Multer + Cloudinary |
| **Notifications** | Sonner (toast notifications) |

---

## 📁 Project Structure

```
JOB-PORTAL/
├── Backend/
│   ├── controllers/         # Core business logic
│   │   ├── user.controller.js
│   │   ├── job.controller.js
│   │   ├── company.controller.js
│   │   └── application.controller.js
│   ├── middleware/
│   │   ├── isAuthenticated.js   # JWT verification middleware
│   │   └── multer.js            # File upload middleware
│   ├── models/              # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── company.model.js
│   │   └── application.model.js
│   ├── routes/              # API route definitions
│   │   ├── user.route.js
│   │   ├── job.route.js
│   │   ├── company.route.js
│   │   └── application.route.js
│   ├── utils/
│   │   ├── db.js            # MongoDB connection
│   │   ├── cloud.js         # Cloudinary config
│   │   └── datauri.js       # Buffer to base64 converter
│   └── index.js             # Express server entry point
│
└── Frontend/
    └── src/
        ├── components/
        │   ├── authentication/      # Login & Register pages
        │   ├── components_lite/     # Student-side pages (Home, Jobs, Profile)
        │   └── admincomponent/      # Recruiter-side pages + ProtectedRoute
        ├── redux/                   # Redux slices & store
        ├── hooks/                   # Custom React hooks
        ├── utils/                   # Constants & helper data
        └── App.jsx                  # Main router config
```

---

## ⚙️ API Endpoints

### User (`/api/user`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register new user with photo |
| `POST` | `/login` | Login & receive auth cookie |
| `POST` | `/logout` | Logout & clear cookie |
| `POST` | `/profile/update` | Update profile & resume *(Protected)* |

### Job (`/api/job`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/post` | Post a new job *(Recruiter only)* |
| `GET` | `/get` | Get all jobs (with keyword search) |
| `GET` | `/get/:id` | Get a single job by ID |
| `GET` | `/getadminjobs` | Get all jobs posted by logged-in admin |

### Company (`/api/company`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Create a new company |
| `GET` | `/get` | Get all companies of logged-in recruiter |
| `GET` | `/get/:id` | Get a single company |
| `PUT` | `/update/:id` | Update company info & logo |

### Application (`/api/application`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/apply/:id` | Apply for a job *(Student only)* |
| `GET` | `/get` | Get all applications of logged-in user |
| `GET` | `/getapplicants/:id` | Get all applicants for a job *(Recruiter)* |
| `PUT` | `/status/:id/update` | Update application status *(Recruiter)* |

---

## 🔐 Security Highlights

- **Passwords** are hashed using `bcrypt` (salt rounds: 10) before storing in the database
- **JWT tokens** are stored in **HTTP-only cookies** — inaccessible to JavaScript, preventing XSS attacks
- **`isAuthenticated` middleware** validates the JWT on every protected API call
- **`ProtectedRoute` component** on the frontend prevents non-Recruiter users from accessing admin pages
- **CORS** is configured to allow only trusted frontend origins with `credentials: true`
- **Duplicate Application** prevention — users cannot apply for the same job twice
- **Unique field validation** on Email, Phone Number, Aadhar Card & PAN Card at the database level

---

## 🔄 How It Works — Request Lifecycle

```
User Action (e.g. Login Form Submit)
    ↓
Frontend: Axios POST → /api/user/login
    ↓
Backend: index.js → user.route.js
    ↓
Middleware: isAuthenticated (for protected routes)
    ↓
Controller: user.controller.js → bcrypt.compare() → jwt.sign()
    ↓
Database: MongoDB via Mongoose
    ↓
Response: JWT stored in HTTP-only Cookie
    ↓
Frontend: Redux store updated → Navigate to Home
```

---

## 🏗️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Clone the Repository
```bash
git clone https://github.com/Abhinav-180/job-portal.git
cd job-portal
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5011
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```
> ✅ You should see: `Server is running on port 5011` and `MongoDB connected...`

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
> ✅ App runs at: `http://localhost:5173`

---

## 🌩️ Environment Variables Summary

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `PORT` | Backend server port |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL (for CORS in production) |

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request



## 👤 Author

**Abhinav Singh**
- GitHub: [@Abhinav-180](https://github.com/Abhinav-180)

---

> ⭐ If you found this project helpful, please consider giving it a **star** on GitHub!
