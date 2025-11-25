// backend/config/db.js
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'employee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        throw err;
    } else {
        console.log('Connected to MySQL database at', db.config.host);
    }
});

module.exports = db;
