

import React, { useState } from 'react';
import './Signup.css'; 
import { signupUser } from '../../api/authApi'; 
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import { Eye, EyeOff } from 'lucide-react';


const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setLoading(true); 
        try {
            const response = await signupUser(formData);
            setMessage(response.data.message);
            setIsSuccess(true); 
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
        <div className="login-wrapper">
             {loading && <LoadingOverlay />}
            <div className="login-card">
                <div className="login-header">
                    <h2>Create Account</h2>
                    <p>Join our community today</p>
                </div>
                
                {message && (
                    <div className={isSuccess ? "success-banner" : "error-banner"}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-field">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            required
                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        />
                    </div>

                    <div className="input-field">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="example@mail.com" 
                            required
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    <div className="input-field">
                        <label>Password</label>
                        <div className="password-input-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                required
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            />
                            <button 
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;