# MySQL Database Setup Guide

## Complete SQL Code for Employee Management System

This guide provides the exact MySQL code used in the project and instructions for setting it up.

---

## Option 1: Using the SQL File Directly

### Step 1: Open MySQL Command Line or Workbench
```bash
mysql -u root -p
```

### Step 2: Run the SQL file
```sql
source C:/Users/LENOVO/Downloads/DBMS-M/database_setup.sql
```

Or copy-paste the SQL commands from `database_setup.sql` directly.

---

## Option 2: Using Node.js Setup Scripts (Recommended)

### Step 1: Setup Database and Tables
```bash
cd backend
node setup_db.js
```

This creates:
- Database: `employee_db`
- Table: `departments` (with HR, Engineering, Sales, Marketing)
- Table: `employees` (with foreign key to departments)

### Step 2: Setup Admin User
```bash
node setup_admin.js
```

This creates:
- Table: `admins`
- Default admin user with bcrypt-hashed password

---

## Database Structure

### Database: `employee_db`

### Table 1: `departments`
```sql
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Default Data:**
- HR (dept_id: 1)
- IT (dept_id: 2)
- Finance (dept_id: 3)

### Table 2: `employees`
```sql
CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    gender ENUM('M', 'F', 'Other') DEFAULT 'M',
    dob DATE,
    dept_id INT,
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);
```

### Table 3: `admins`
```sql
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

**Default Admin:**
- Username: `admin`
- Password: `admin123` (stored as bcrypt hash)

---

## Useful MySQL Commands

### View All Tables
```sql
USE employee_db;
SHOW TABLES;
```

### View All Employees with Department Names
```sql
SELECT e.emp_id, e.emp_name, e.email, e.phone, e.gender, e.dob, 
       d.dept_name, e.hire_date
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.emp_id DESC;
```

### Get Employee Count by Department
```sql
SELECT d.dept_name, COUNT(e.emp_id) as employee_count
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name;
```

### Get Total Employee Count
```sql
SELECT COUNT(*) as total_employees FROM employees;
```

### Get Recent 5 Employees
```sql
SELECT e.emp_id, e.emp_name, e.email, d.dept_name, e.hire_date
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.hire_date DESC
LIMIT 5;
```

### Check Admin User
```sql
SELECT admin_id, username, created_at FROM admins;
```

---

## Manual SQL Setup (Copy-Paste Method)

If you prefer to set up manually, here's the complete SQL code:

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Create Departments Table
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Default Departments
INSERT INTO departments (dept_name) VALUES 
    ('HR'),
    ('IT'),
    ('Finance');

-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    gender ENUM('M', 'F', 'Other') DEFAULT 'M',
    dob DATE,
    dept_id INT,
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL,
    INDEX idx_dept_id (dept_id),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Note:** After running the above SQL, you MUST run `node setup_admin.js` to create the admin user with a properly hashed password.

---

## Troubleshooting

### Error: "Can't create database"
- Make sure MySQL server is running
- Check if you have permission to create databases
- Try logging in as root user

### Error: "Foreign key constraint fails"
- Make sure to create `departments` table before `employees` table
- Ensure departments have been inserted before inserting employees

### Error: "Table already exists"
- If you want to start fresh, drop the database first:
  ```sql
  DROP DATABASE employee_db;
  ```
- Then re-run the setup scripts

---

## Database Credentials

Update these in `backend/.env`:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_db
```

---

## Verification

After setup, verify everything is working:

```bash
# In MySQL
USE employee_db;
SHOW TABLES;  # Should show: admins, departments, employees
SELECT * FROM departments;  # Should show: HR, IT, Finance
SELECT COUNT(*) FROM admins;  # Should return: 1
```

---

That's it! Your database is ready to use with the Employee Management System. 🎉
