import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reset.css'; 

const ResetPassword = () => {
    const { token } = useParams(); // Grabs the token from the URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert("Passwords don't match");

        try {
            const res = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 3000); // Send them to login after success
        } catch (err) {
            setMessage(err.response?.data?.message || "Reset failed. Link may be expired.");
        }
    };

    return (
        <div className="setup-wrapper">
            <div className="setup-card">
                <h2>New Password</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Update Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;