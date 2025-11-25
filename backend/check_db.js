const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ronak@1234',
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL with config:', connection.config.host, connection.config.database);

    connection.query("SELECT COUNT(*) as count FROM employees", (err, res) => {
        if (err) console.error(err);
        else console.log("Employee count in DB:", res[0].count);

        connection.query("SELECT * FROM employees", (err, emps) => {
            if (err) console.error(err);
            else console.log("Employees:", emps);

            connection.end();
        });
    });
});
