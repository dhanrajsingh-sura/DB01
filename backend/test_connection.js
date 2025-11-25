const mysql = require('mysql2');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'ronak@1234',
    database: 'employee_db'
};

console.log("Attempting to connect with config:", config);

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('CONNECTION FAILED:', err);
        process.exit(1);
    }
    console.log('CONNECTION SUCCESSFUL');

    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('QUERY FAILED:', err);
        } else {
            console.log('The solution is: ', results[0].solution);
        }
        connection.end();
    });
});
