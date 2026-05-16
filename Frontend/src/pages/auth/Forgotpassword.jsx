import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgot.css'; 
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        // Log to console to see if this even triggers
        console.log("Attempting to send reset link to:", email);

        const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
        setMessage(response.data.message);
    } catch (err) {
        // Detailed error logging
        console.error("Full Error Object:", err);
        setError(err.response?.data?.message || 'Server is unreachable. Check your backend.');
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="auth-wrapper-white">
            <div className="auth-card-white">
                <div className="auth-header">
                    <h2>Reset Password</h2>
                    <p>No worries! Enter your email below to recover your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="example@mail.com" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? <div className="spinner"></div> : "Send Reset Link"}
                    </button>
                </form>

                {message && <div className="status-msg success-light">{message}</div>}

                <div className="auth-footer-white">
                    <Link to="/login" className="back-link-dark">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;