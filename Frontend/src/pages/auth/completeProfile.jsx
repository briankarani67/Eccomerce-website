import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompleteProfile.css';
import { X } from 'lucide-react';

const CompleteProfile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        country: 'Kenya'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Get the logged-in user's ID from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        try {
            await axios.post(`${API_URL}/api/profiles/create`, {
                ...formData,
                user_id: storedUser.id // Links to the user_id in your MySQL table
            });
            
            // Success! Now take them to the dashboard
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="setup-wrapper">
            <div className="setup-card">
                <button 
                    className="close-btn" 
                    onClick={() => navigate('/')}
                    aria-label="Close"
                >
                    <X size={24} />
                </button>
                <h2>Complete Your Profile</h2>
                <p>Just a few more details to get you started.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>First Name</label>
                        <input name="first_name" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <input name="last_name" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <div className="phone-box">
                            <span>+254</span>
                            <input 
                                name="phone" 
                                type="text" 
                                placeholder="722..." 
                                required 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Finish Setup'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfile;