import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css'; // Uses your same design system rules safely

const MemberDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchSingleMember = async () => {
            try {
                // Requests single target record data criteria safely with tokens attached
                const response = await axios.get(`${API_URL}/api/auth/members/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMember(response.data);
            } catch (err) {
                console.error("Error fetching individual profile records:", err);
                
                alert("Could not load member data. Returning to overview dashboard.");
                navigate('/admin/members');
            } finally {
                setLoading(false);
            }
        };

        fetchSingleMember();
    }, [id, navigate, API_URL]);

    if (loading) return <div className="admin-wrapper"><div className="loader">Loading comprehensive dossier...</div></div>;
    if (!member) return <div className="admin-wrapper"><div className="loader">Member record not found.</div></div>;

    return (
        <div className="admin-wrapper">
            <div className="admin-container">
                <button className="action-view-btn" style={{ marginBottom: '20px' }} onClick={() => navigate('/admin/members')}>
                    ← Back to All Members
                </button>

                <div className="admin-card">
                    <div className="admin-header-flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem' }}>
                                {member.first_name ? `${member.first_name} ${member.last_name}` : 'Setup Pending Account'}
                            </h2>
                            <p style={{ color: 'goldenrod' }}>User ID: #{member.user_id}</p>
                        </div>
                        <span className={`role-badge ${member.role}`}>{member.role}</span>
                    </div>

                    {/* Detailed Layout Display Fields cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>Email Address</label>
                            <p style={{ fontSize: '16px', color: '#fff', margin: '5px 0 0 0' }}>{member.email}</p>
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>Phone Line Connection</label>
                            <p style={{ fontSize: '16px', color: '#fff', margin: '5px 0 0 0' }}>{member.phone || 'Not provided'}</p>
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>Origin Country</label>
                            <p style={{ fontSize: '16px', color: '#fff', margin: '5px 0 0 0' }}>{member.country || 'Not configured'}</p>
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>Member Since</label>
                            <p style={{ fontSize: '16px', color: '#fff', margin: '5px 0 0 0' }}>
                                {new Date(member.created_at).toLocaleString('en-GB')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetail;