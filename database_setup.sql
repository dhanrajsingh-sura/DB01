-- ============================================
-- Employee Management System - Complete MySQL Database Setup
-- ============================================

-- Drop existing database if exists (CAUTION: This will delete all data)
DROP DATABASE IF EXISTS employee_db;

-- Create database
CREATE DATABASE employee_db;

-- Use the database
USE employee_db;

-- ============================================
-- TABLE: departments
-- ============================================
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default departments
INSERT INTO departments (dept_name) VALUES 
    ('HR'),
    ('IT'),
    ('Finance');

-- ============================================
-- TABLE: employees
-- ============================================
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
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL,
    INDEX idx_dept_id (dept_id),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample employees (optional)
INSERT INTO employees (emp_name, email, phone, gender, dob, dept_id, hire_date) VALUES
    ('John Doe', 'john.doe@company.com', '1234567890', 'M', '1990-05-15', 2, '2020-01-10'),
    ('Jane Smith', 'jane.smith@company.com', '0987654321', 'F', '1992-08-22', 1, '2019-03-15'),
    ('Bob Johnson', 'bob.johnson@company.com', '5551234567', 'M', '1988-12-03', 3, '2018-07-20'),
    ('Alice Williams', 'alice.w@company.com', '5559876543', 'F', '1995-03-10', 2, '2021-05-01'),
    ('Charlie Brown', 'charlie.b@company.com', '5552468642', 'M', '1991-11-25', 2, '2020-09-15');

-- ============================================
-- TABLE: admins
-- ============================================
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user
-- Password: admin123 (hashed with bcrypt)
-- Note: The hash below is a placeholder. Run setup_admin.js to generate the actual hash
INSERT INTO admins (username, password) VALUES
    ('admin', '$2a$10$placeholder.hash.will.be.generated.by.setup_admin.script');

-- ============================================
-- USEFUL QUERIES FOR REFERENCE
-- ============================================

-- View all employees with their department names
-- SELECT e.emp_id, e.emp_name, e.email, e.phone, e.gender, e.dob, 
--        d.dept_name, e.hire_date
-- FROM employees e
-- LEFT JOIN departments d ON e.dept_id = d.dept_id
-- ORDER BY e.emp_id DESC;

-- Get employee count by department
-- SELECT d.dept_name, COUNT(e.emp_id) as employee_count
-- FROM departments d
-- LEFT JOIN employees e ON d.dept_id = e.dept_id
-- GROUP BY d.dept_id, d.dept_name;

-- Get total employee count
-- SELECT COUNT(*) as total_employees FROM employees;

-- Get recent employees (last 5)
-- SELECT e.emp_id, e.emp_name, e.email, d.dept_name, e.hire_date
-- FROM employees e
-- LEFT JOIN departments d ON e.dept_id = d.dept_id
-- ORDER BY e.hire_date DESC
-- LIMIT 5;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if all tables are created
SHOW TABLES;

-- Check departments
SELECT * FROM departments;

-- Check employees count
SELECT COUNT(*) as total_employees FROM employees;

-- Check admin user
SELECT admin_id, username, created_at FROM admins;

-- ============================================
-- NOTES
-- ============================================
-- 1. Run this script first to set up the database structure
-- 2. Then run setup_admin.js from Node.js to create admin with proper bcrypt hash
-- 3. The employee_db database will be created automatically
-- 4. Default departments: HR, IT, Finance will be added
-- 5. Sample employees are included (optional, can be removed)
-- 6. All tables use InnoDB engine for transaction support
-- 7. Foreign key constraints ensure referential integrity
-- 8. Indexes are added for frequently queried columns
-- ============================================
