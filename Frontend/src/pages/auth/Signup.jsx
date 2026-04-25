import React, { useState } from 'react';
import './Signup.css'; // Import the styling
import { signupUser } from '../../api/authApi'; // Import the API call function
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';


const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setLoading(true); 
        try {
            const response = await signupUser(formData);
            setMessage(response.data.message);
            setIsSuccess(true); // Set success state to true
            // Optionally redirect to login page here
            setTimeout(() => {
                 navigate('/login');
             }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            setIsSuccess(false); 
        }
        finally {
            setLoading(false); 
        }
    };

    return (
        <div className="auth-wrapper">
             {loading && <LoadingOverlay />}
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

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                
                {message && (
                    <div className={`status-msg ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </div>
        )}
                
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;