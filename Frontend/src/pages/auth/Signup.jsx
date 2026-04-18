import React, { useState } from 'react';
import './Signup.css'; // Import the styling

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData = '';
        try {
            const response = await signupUser(formData);
            setMessage(response.data.message);
            // Optionally redirect to login page here
        } catch (error) {
            // This is where your specific backend errors (e.g., "Email taken") show up
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Join our community today</p>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text" placeholder="Enter username" required
                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" placeholder="example@mail.com" required
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" placeholder="••••••••" required
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        />
                    </div>

                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>
                
                {message && <div className="status-msg">{message}</div>}
                
                <p className="auth-footer">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;