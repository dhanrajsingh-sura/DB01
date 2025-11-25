const axios = require('axios');

const API_URL = "http://localhost:5000/api/employees";

async function getEmployees() {
    try {
        console.log("Sending GET request to:", API_URL);
        const res = await axios.get(API_URL);
        console.log("Success. Count:", res.data.length);
        console.log("Data:", res.data);
    } catch (error) {
        console.error("Error fetching employees:");
        if (error.response) {
            console.error("Status:", error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

getEmployees();
