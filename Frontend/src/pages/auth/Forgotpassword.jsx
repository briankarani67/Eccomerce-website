import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgot.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Your API call here
        setLoading(false);
        setMessage('Check your email for the reset link.');
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