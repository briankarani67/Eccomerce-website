// import axios from 'axios';

// const API_URL = 'http://localhost:3306/api/auth';

// export const signupUser = async (userData) => {
//     return await axios.post(`${API_URL}/signup`, userData);
// };

// export const loginUser = async (credentials) => {
//     return await axios.post(`${API_URL}/login`, credentials);
// };

import axios from 'axios';

// Create an axios instance (Best practice)
const API = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signupUser = async (userData) => {
    // Axios uses .post(url, data)
    // No need for 'method: POST' or 'body: JSON.stringify'
    return await API.post('/signup', userData);
};

export const loginUser = async (credentials) => {
    return await API.post('/login', credentials);
};