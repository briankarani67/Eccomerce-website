import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        // 1. Client-side protection: Read stored session info
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.role !== 'admin') {
            navigate('/profile'); 
            return;
        }

        // 2. Verified Admin: Request member list from server with Authorization header
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/auth/members`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Sends the validation token to the server
                    }
                });
                setMembers(response.data);
            } catch (err) {
                console.error("Error fetching members", err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/profile'); // Kick out if the token fails server validation
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [navigate, API_URL]);

    return (
        <div className="admin-wrapper">
            <div className="admin-card">
                <div className="admin-header">
                    <h2>Member Management</h2>
                    <p>Viewing all registered users and their profile status</p>
                </div>

                <div className="table-container">
                    {loading ? (
                        <div className="loader">Loading Members...</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email Address</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>Joined Date</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.user_id}>
                                        <td className="name-cell">
                                            {member.first_name ? `${member.first_name} ${member.last_name}` : <span className="pending">Profile Pending</span>}
                                        </td>
                                        <td>{member.email}</td>
                                        <td>{member.phone || '—'}</td>
                                        <td>{member.country || '—'}</td>
                                        <td>{new Date(member.created_at).toLocaleDateString('en-GB')}</td>
                                        <td>
                                            <span className={`role-badge ${member.role}`}>
                                                {member.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;