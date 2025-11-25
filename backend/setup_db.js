const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ronak@1234'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    // Create Database
    connection.query("CREATE DATABASE IF NOT EXISTS employee_db", (err) => {
        if (err) {
            console.error('Error creating database:', err);
            process.exit(1);
        }
        console.log('Database employee_db created or already exists.');

        // Use Database
        connection.changeUser({ database: 'employee_db' }, (err) => {
            if (err) {
                console.error('Error switching to database:', err);
                process.exit(1);
            }

            // Create Departments Table
            const createDeptTable = `
                CREATE TABLE IF NOT EXISTS departments (
                    dept_id INT AUTO_INCREMENT PRIMARY KEY,
                    dept_name VARCHAR(255) NOT NULL
                )
            `;
            connection.query(createDeptTable, (err) => {
                if (err) console.error('Error creating departments table:', err);
                else console.log('Departments table ready.');
            });

            // Create Employees Table
            const createEmpTable = `
                CREATE TABLE IF NOT EXISTS employees (
                    emp_id INT AUTO_INCREMENT PRIMARY KEY,
                    emp_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(20),
                    gender VARCHAR(10),
                    dob DATE,
                    dept_id INT,
                    hire_date DATE,
                    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
                )
            `;
            connection.query(createEmpTable, (err) => {
                if (err) {
                    console.error('Error creating employees table:', err);
                } else {
                    console.log('Employees table ready.');
                }
                
                // Insert some dummy departments if empty
                connection.query("SELECT COUNT(*) as count FROM departments", (err, results) => {
                     if (!err && results[0].count === 0) {
                         const insertDepts = "INSERT INTO departments (dept_name) VALUES ('HR'), ('Engineering'), ('Sales'), ('Marketing')";
                         connection.query(insertDepts, (err) => {
                             if (err) console.error("Error inserting default departments:", err);
                             else console.log("Default departments inserted.");
                             connection.end();
                         });
                     } else {
                         connection.end();
                     }
                });
            });
        });
    });
});
