// backend/routes/dashboard.js
const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticateToken, (req, res) => {
    // Get total employees
    const totalQuery = 'SELECT COUNT(*) as total FROM employees';

    // Get department breakdown
    const deptQuery = `
        SELECT d.dept_name, COUNT(e.emp_id) as count
        FROM departments d
        LEFT JOIN employees e ON d.dept_id = e.dept_id
        GROUP BY d.dept_id, d.dept_name
    `;

    // Get recent employees (last 5)
    const recentQuery = `
        SELECT e.emp_id, e.emp_name, e.email, d.dept_name, e.hire_date
        FROM employees e
        LEFT JOIN departments d ON e.dept_id = d.dept_id
        ORDER BY e.hire_date DESC
        LIMIT 5
    `;

    db.query(totalQuery, (err1, totalResult) => {
        if (err1) {
            console.error('Error getting total employees:', err1);
            return res.status(500).json({ error: 'Failed to fetch statistics' });
        }

        db.query(deptQuery, (err2, deptResult) => {
            if (err2) {
                console.error('Error getting department breakdown:', err2);
                return res.status(500).json({ error: 'Failed to fetch statistics' });
            }

            db.query(recentQuery, (err3, recentResult) => {
                if (err3) {
                    console.error('Error getting recent employees:', err3);
                    return res.status(500).json({ error: 'Failed to fetch statistics' });
                }

                res.json({
                    totalEmployees: totalResult[0].total,
                    departmentBreakdown: deptResult,
                    recentEmployees: recentResult
                });
            });
        });
    });
});

module.exports = router;
