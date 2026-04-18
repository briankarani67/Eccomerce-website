import axios from 'axios';

const API_URL = 'http://localhost:3306/api/auth';

export const signupUser = async (userData) => {
    return await axios.post(`${API_URL}/signup`, userData);
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};