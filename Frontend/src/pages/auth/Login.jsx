import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import './Login.css'; // Create this file in the same folder
import LoadingOverlay from './LoadingOverlay';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

 const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(credentials);
            
            // 1. Destructure the new hasProfile flag from your backend response
            const { token, user, hasProfile } = response.data;

            // 2. Store the token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 3. Logic: If profile doesn't exist, go to setup. Otherwise, go to dashboard.
            if (hasProfile === false) {
                navigate('/completeProfile'); 
            } else {
                navigate('/dashboard');
            }
            
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {loading && <LoadingOverlay />}
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-field">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            required 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <div className="label-row">
                            <label htmlFor="password">Password</label>
                            <Link to="/forgotpassword" id="forgot-link">Forgot?</Link>
                        </div>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required 
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup">Create account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;