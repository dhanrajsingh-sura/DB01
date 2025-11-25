const axios = require('axios');

const API_URL = "http://localhost:5000/api/employees";

const employeeData = {
    emp_name: "Test User 2",
    email: "test@example.com",
    phone: "1234567890",
    gender: "M",
    dob: "1990-01-01",
    dept_id: 1,
    hire_date: "2023-01-01"
};

async function addEmployee() {
    try {
        console.log("Sending request to:", API_URL);
        console.log("Data:", employeeData);
        const res = await axios.post(API_URL, employeeData);
        console.log("Success:", res.data);
    } catch (error) {
        console.error("Error adding employee:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

addEmployee();
