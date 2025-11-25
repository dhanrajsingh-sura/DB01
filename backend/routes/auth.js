// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

const fs = require('fs');
const path = require('path');

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Log attempt
    const logData = `[${new Date().toISOString()}] Login attempt:\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}\n\n`;
    fs.appendFileSync(path.join(__dirname, '../login_attempts.log'), logData);

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = 'SELECT * FROM admins WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const admin = results[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        try {
            // Generate JWT token
            const token = jwt.sign(
                { admin_id: admin.admin_id, username: admin.username },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                admin: {
                    admin_id: admin.admin_id,
                    username: admin.username
                }
            });
        } catch (error) {
            console.error('JWT Error:', error);
            res.status(500).json({ error: 'JWT Error: ' + error.message });
        }
    });
});

// Verify token endpoint
router.get('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, admin: decoded });
    } catch (error) {
        res.status(403).json({ valid: false });
    }
});

module.exports = router;
