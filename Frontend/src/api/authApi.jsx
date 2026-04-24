

import axios from 'axios';

// Create an axios instance (Best practice)

const API_URL = import.meta.env.VITE_API_URL || 'https://eccomerce-website-77zg.onrender.com';
const API = axios.create({
    baseURL: `${API_URL}/api/auth`,
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