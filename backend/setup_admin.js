// backend/setup_admin.js
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'employee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

async function setupAdmin() {
    try {
        // Create admins table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS admins (
                admin_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating admins table:', err);
                db.end();
                process.exit(1);
            }
            console.log('✓ Admins table created/verified');

            // Hash the default password
            const defaultPassword = 'admin123';
            bcrypt.hash(defaultPassword, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    console.error('Error hashing password:', hashErr);
                    db.end();
                    process.exit(1);
                }

                // Insert default admin (or update if exists)
                const insertAdminQuery = `
                    INSERT INTO admins (username, password)
                    VALUES ('admin', ?)
                    ON DUPLICATE KEY UPDATE password = ?
                `;

                db.query(insertAdminQuery, [hashedPassword, hashedPassword], (insertErr) => {
                    if (insertErr) {
                        console.error('Error creating admin user:', insertErr);
                        db.end();
                        process.exit(1);
                    }

                    console.log('✓ Default admin user created/updated');
                    console.log('  Username: admin');
                    console.log('  Password: admin123');
                    console.log('\n⚠️  Please change the default password after first login!\n');

                    db.end();
                    process.exit(0);
                });
            });
        });

    } catch (error) {
        console.error('Setup failed:', error);
        db.end();
        process.exit(1);
    }
}

setupAdmin();
