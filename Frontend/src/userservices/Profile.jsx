import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 'Kenya'
    });
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    useEffect(() => {
        const fetchProfile = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            try {
                // Adjust the URL to your backend port
                const res = await axios.get(`${API_URL}/api/auth/profile/${storedUser.id}`);
                setFormData(res.data);
            } catch (err) {
                console.error("Error fetching profile from database", err);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="profile-wrapper">
            <div className="profile-grid">
                {/* Left Card: Personal Details */}
                <div className="profile-card main-info">
                    <div className="user-profile-header">
                        <div className="profile-avatar">
                            {formData.first_name.charAt(0)}{formData.last_name.charAt(0)}
                        </div>
                        <div className="user-meta">
                            <h2>{formData.first_name} {formData.last_name}</h2>
                            <p className="user-email">{formData.email}</p>
                        </div>
                    </div>

                    <form className="profile-form">
                        <div className="form-row">
                            <div className="field">
                                <label>First Name*</label>
                                <input type="text" value={formData.first_name} readOnly />
                            </div>
                            <div className="field">
                                <label>Last Name*</label>
                                <input type="text" value={formData.last_name} readOnly />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="field">
                                <label>Country</label>
                                <select value={formData.country} disabled>
                                    <option value="Kenya">Kenya</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Phone* No zero (722...)</label>
                                <div className="phone-box">
                                    <span className="prefix">254</span>
                                    <input type="text" value={formData.phone} readOnly />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="update-btn">Update Profile</button>
                    </form>
                </div>

                {/* Right Card: Security */}
                <div className="profile-card security-info">
                    <h3>Change Password</h3>
                    <div className="field">
                        <label>Current Password*</label>
                        <input type="password" placeholder="Enter Current Password" />
                    </div>
                    <div className="field">
                        <label>New Password*</label>
                        <input type="password" placeholder="Enter New Password" />
                    </div>
                    <div className="field">
                        <label>Confirm Password*</label>
                        <input type="password" placeholder="Confirm New Password" />
                    </div>
                    <button type="button" className="change-btn">Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;