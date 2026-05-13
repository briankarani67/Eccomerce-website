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
    
    // State to toggle editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProfile = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            try {
                // Pointing to your NEW profiles route
                const res = await axios.get(`${API_URL}/api/profiles/${storedUser.id}`);
                setFormData(res.data);
            } catch (err) {
                console.error("Error fetching profile", err);
            }
        };
        fetchProfile();
    }, [API_URL]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!isEditing) {
            setIsEditing(true); 
            return;
        }

        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));

        try {
            await axios.put(`${API_URL}/api/profiles/update/${storedUser.id}`, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
                country: formData.country
            });
            
            alert("Profile updated successfully!");
            setIsEditing(false); // Switch back to read-only
        } catch (err) {
            console.error("Update error", err);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-grid">
                <div className="profile-card main-info">
                    <div className="user-profile-header">
                        <div className="profile-avatar">
                            {formData.first_name?.charAt(0)}{formData.last_name?.charAt(0)}
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
                                <input 
                                    name="first_name"
                                    type="text" 
                                    value={formData.first_name} 
                                    onChange={handleChange}
                                    readOnly={!isEditing} 
                                    className={isEditing ? "editable" : ""}
                                />
                            </div>
                            <div className="field">
                                <label>Last Name*</label>
                                <input 
                                    name="last_name"
                                    type="text" 
                                    value={formData.last_name} 
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={isEditing ? "editable" : ""}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="field">
                                <label>Country</label>
                                <select 
                                    name="country"
                                    value={formData.country} 
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                >
                                    <option value="Kenya">Kenya</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Tanzania">Tanzania</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Phone* No zero (722...)</label>
                                <div className="phone-box">
                                    <span className="prefix">254</span>
                                    <input 
                                        name="phone"
                                        type="text" 
                                        value={formData.phone} 
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        className={isEditing ? "editable" : ""}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            type="button" 
                            className={`update-btn ${isEditing ? "save-mode" : ""}`}
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : isEditing ? "Save Changes" : "Update Profile"}
                        </button>

                        {isEditing && (
                            <button 
                                type="button" 
                                className="cancel-btn" 
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
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