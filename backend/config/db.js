// backend/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // change if needed
    password: 'ronak@1234',        // your MySQL password
    database: 'employee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
