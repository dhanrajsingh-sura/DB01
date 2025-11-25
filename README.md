# Employee Management System

A modern, full-stack web application for managing employee records with JWT authentication, dashboard analytics, and a professional UI/UX.

## 🚀 Features

- 🔐 **Secure Authentication** - JWT-based admin login with bcrypt password hashing
- 📊 **Dashboard** - Statistics cards showing total employees and department breakdown
- 👥 **Employee Management** - Complete CRUD operations with search functionality
- 🎨 **Modern UI/UX** - Professional design with gradients, animations, and responsive layout
- 🔍 **Search & Filter** - Real-time employee search by name, email, or department
- 🔔 **Toast Notifications** - Success/error feedback for all operations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- React Router DOM
- Axios
- React Toastify
- Vanilla CSS

### Backend
- Node.js
- Express.js 5.1.0
- MySQL (mysql2)
- JWT (jsonwebtoken)
- Bcrypt.js
- CORS
- dotenv

### Database
- MySQL
- Tables: `employees`, `departments`, `admins`

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_db
```

4. Set up the database:
```bash
node setup_db.js
node setup_admin.js
```

5. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open on `http://localhost:3000`

## 🔑 Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important:** Change these credentials in production!

## 📖 Usage

1. **Login** - Navigate to the application and login with admin credentials
2. **Dashboard** - View employee statistics and recent additions
3. **Manage Employees** - Click "Employees" in sidebar to:
   - Add new employees
   - Search existing employees
   - Edit employee details
   - Delete employees

## 🎨 UI Preview

- **Login Page** - Gradient background with glassmorphism login card
- **Dashboard** - Statistics cards with department breakdown
- **Employee Management** - Modern table with search and CRUD operations
- **Sidebar Navigation** - Dark theme with active state indicators

## 📁 Project Structure

```
DBMS-M/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── dashboard.js
│   ├── .env
│   ├── server.js
│   ├── setup_admin.js
│   ├── setup_db.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── Dashboard.css
    │   │   ├── EmployeeManagement.js
    │   │   ├── EmployeeManagement.css
    │   │   ├── Login.js
    │   │   ├── Login.css
    │   │   ├── ProtectedRoute.js
    │   │   ├── Sidebar.js
    │   │   └── Sidebar.css
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🔒 Security Features

- JWT token-based authentication
- Protected API routes
- Bcrypt password hashing
- CORS configuration
- Environment variable management

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Dashboard
- `GET /api/dashboard/stats` - Get employee statistics

### Employees (Protected)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## 📝 Database Schema

### admins
- `admin_id` (INT, Primary Key)
- `username` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `created_at` (TIMESTAMP)

### employees
- `emp_id` (INT, Primary Key)
- `emp_name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `gender` (ENUM: M, F, Other)
- `dob` (DATE)
- `dept_id` (INT, Foreign Key)
- `hire_date` (DATE)

### departments
- `dept_id` (INT, Primary Key)
- `dept_name` (VARCHAR)

## 🚀 Deployment

For production deployment:

1. Update JWT_SECRET in `.env`
2. Change default admin password
3. Configure proper CORS origins
4. Set up MySQL database on production server
5. Use process manager (PM2) for backend
6. Build frontend: `npm run build`
7. Serve frontend build with nginx/apache

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Dhanraj Singh Sura

## 🙏 Acknowledgments

- Built with React and Express
- UI inspired by modern SaaS applications
- Icons and emojis for visual enhancement
