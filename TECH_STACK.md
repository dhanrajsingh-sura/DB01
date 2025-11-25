# Technology Stack - Employee Management System

This document outlines all the technologies used in building this Employee Management System web application.

---

## **Frontend**

### Core Technologies
- **React** `^19.2.0` - A JavaScript library for building user interfaces
  - **React DOM** `^19.2.0` - React package for working with the DOM
  - **React Scripts** `5.0.1` - Configuration and scripts for Create React App

### HTTP Client
- **Axios** `^1.13.2` - Promise-based HTTP client for making API requests to the backend

### Development & Build Tools
- **Create React App (CRA)** - Development environment and build tool for React applications
- **Webpack** - Module bundler (part of CRA)
- **Babel** - JavaScript compiler (part of CRA)

### Testing Libraries
- **@testing-library/react** `^16.3.0` - React component testing utilities
- **@testing-library/jest-dom** `^6.9.1` - Custom Jest matchers for DOM elements
- **@testing-library/user-event** `^13.5.0` - User event simulation for tests
- **@testing-library/dom** `^10.4.1` - DOM testing utilities

### Performance Monitoring
- **Web Vitals** `^2.1.4` - Library for measuring web performance metrics

---

## **Backend**

### Runtime & Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** `^5.1.0` - Fast, unopinionated web framework for Node.js

### Database
- **MySQL** - Relational database management system
- **mysql2** `^3.15.3` - MySQL client for Node.js with support for Promises

### Middleware & Security
- **CORS** `^2.8.5` - Cross-Origin Resource Sharing middleware for handling requests from different origins

---

## **Database Schema**

### Tables
- **employees** - Stores employee information
  - Fields: `emp_id`, `emp_name`, `email`, `phone`, `gender`, `dob`, `dept_id`, `hire_date`
  
- **departments** - Stores department information
  - Fields: `dept_id`, `dept_name`
  - Predefined departments: HR (1), IT (2), Finance (3)

---

## **Styling & UI**

### CSS
- **Vanilla CSS** - Custom stylesheets for styling components
  - `App.css` - Main application styles
  - `index.css` - Global styles

---

## **Architecture**

### Design Pattern
- **Client-Server Architecture**
  - Frontend: React SPA (Single Page Application)
  - Backend: RESTful API built with Express.js
  - Database: MySQL relational database

### API Communication
- **REST API** - Communication between frontend and backend using RESTful endpoints
  - `GET /api/employees` - Fetch all employees
  - `POST /api/employees` - Add new employee
  - `PUT /api/employees/:id` - Update employee
  - `DELETE /api/employees/:id` - Delete employee
  - `GET /api/db-check` - Database connection health check

---

## **Development Environment**

### Package Managers
- **npm** - Node Package Manager for managing dependencies

### Version Control
- **Git** - Distributed version control system

---

## **Server Configuration**

### Ports
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

### Database Connection
- **Host**: `127.0.0.1` (localhost)
- **Port**: `3306` (MySQL default)
- **Database**: `employee_db`

---

## **Browser Support**

### Production
- \>0.2% market share
- Not dead browsers
- Not Opera Mini

### Development
- Latest Chrome version
- Latest Firefox version
- Latest Safari version

---

## **Key Features Implemented**

1. **CRUD Operations** - Create, Read, Update, Delete employees
2. **Form Validation** - Client-side validation for employee data
3. **Department Management** - Integration with departments table
4. **Responsive UI** - Modern, professional interface
5. **Error Handling** - Comprehensive error handling on both frontend and backend
6. **CORS Configuration** - Proper cross-origin resource sharing setup

---

## **Testing Framework**

- **Jest** - JavaScript testing framework (integrated with CRA)
- **React Testing Library** - Testing utilities for React components

---

## **Project Structure**

```
DBMS-M/
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Component styles
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   └── package.json        # Frontend dependencies
│
└── backend/
    ├── config/
    │   └── db.js           # Database configuration
    ├── server.js           # Express server & API routes
    └── package.json        # Backend dependencies
```

---

## **Notes for Development**

- The application uses **CommonJS** module system (`require/module.exports`) on the backend
- The frontend uses **ES6 modules** (`import/export`)
- Database credentials are currently hardcoded (consider using environment variables for production)
- Both frontend and backend run concurrently during development
