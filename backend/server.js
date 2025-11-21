// backend/server.js
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = 5000;

// FIXED CORS
app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// ------------------ ROUTES ------------------

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `
        SELECT e.emp_id, e.emp_name, e.email, e.phone, e.gender, e.dob,
               d.dept_name, e.hire_date, e.dept_id
        FROM employees e
        LEFT JOIN departments d ON e.dept_id = d.dept_id
        ORDER BY e.emp_id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Add new employee
app.post('/api/employees', (req, res) => {
    let { emp_name, email, phone, gender, dob, dept_id, hire_date } = req.body;

    // Basic validation
    if (!emp_name || !email) {
        return res.status(400).json({ error: 'emp_name and email are required' });
    }

    // Normalize/convert types
    dept_id = dept_id === undefined || dept_id === null || dept_id === '' ? null : parseInt(dept_id, 10);
    phone = phone === undefined || phone === null || phone === '' ? null : phone;
    dob = dob === undefined || dob === null || dob === '' ? null : dob;
    hire_date = hire_date === undefined || hire_date === null || hire_date === '' ? null : hire_date;

    const sql = `
        INSERT INTO employees (emp_name, email, phone, gender, dob, dept_id, hire_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [emp_name, email, phone, gender, dob, dept_id, hire_date], (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            return res.status(500).json({ error: err.message || err });
        }
        res.json({ message: 'Employee added successfully', emp_id: result.insertId });
    });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
    const emp_id = req.params.id;
    const { emp_name, email, phone, gender, dob, dept_id, hire_date } = req.body;

    const sql = `
        UPDATE employees
        SET emp_name = ?, email = ?, phone = ?, gender = ?, dob = ?, dept_id = ?, hire_date = ?
        WHERE emp_id = ?
    `;
    db.query(sql, [emp_name, email, phone, gender, dob, dept_id, hire_date, emp_id], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const emp_id = req.params.id;
    const sql = `DELETE FROM employees WHERE emp_id = ?`;
    db.query(sql, [emp_id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// --------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Global error handler (should be after routes)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
