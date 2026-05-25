import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getGreeting } from '../../utils/Helper'; 
import './Admin.css';

const AdminMembers = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [username, setUsername] = useState("");
    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        // 1. Set Workspace Greetings Layout
        setGreeting(getGreeting());

        // 2. Combined Security & Profile Fetching Wall
        const token = localStorage.getItem('token');
        const storedUserString = localStorage.getItem('user');

        if (!token || !storedUserString) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUserString);
        
        // Safety check to set username safely
        if (user && user.username) {
            setUsername(user.username);
        }

        // Redirect ordinary users instantly
        if (user.role !== 'admin') {
            navigate('/profile');
            return;
        }

        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/auth/members`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMembers(response.data);
                setFilteredMembers(response.data);
            } catch (err) {
                console.error("Error fetching members", err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/profile');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [navigate, API_URL]);

    const handleToggleStatus = async (userId, currentRole) => {
    const token = localStorage.getItem('token');
    // If they are currently suspended, we want to 'activate' them back to a 'user'
    const action = currentRole === 'suspended' ? 'activate' : 'deactivate';
    const expectedNewRole = action === 'activate' ? 'user' : 'suspended';
    
    try {
        await axios.put(`${API_URL}/api/auth/members/${userId}/status`, 
            { action: action },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        
        setMembers(prevMembers => 
            prevMembers.map(member => 
                member.user_id === userId ? { ...member, role: expectedNewRole } : member
            )
        );
    } catch (err) {
        console.error("Failed to change user status", err);
        alert("Error altering user status privileges.");
    }
};

    // Handle Search and Filtering Logic
    useEffect(() => {
        let results = members;

        if (searchTerm) {
            results = results.filter(member => {
                const fullName = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase();
                const email = (member.email || '').toLowerCase();
                const phone = (member.phone || '').toLowerCase();
                const search = searchTerm.toLowerCase();
                
                return fullName.includes(search) || email.includes(search) || phone.includes(search);
            });
        }

        if (statusFilter !== 'all') {
            if (statusFilter === 'completed') {
                results = results.filter(member => member.first_name);
            } else if (statusFilter === 'pending') {
                results = results.filter(member => !member.first_name);
            }
        }

        setFilteredMembers(results);
    }, [searchTerm, statusFilter, members]);

    const totalMembers = members.length;
    const completedProfiles = members.filter(m => m.first_name).length;
    const pendingProfiles = totalMembers - completedProfiles;



    return (
        <div className="admin-wrapper">
            <div className="admin-container">
                <header className="home-header">
                    <div className="text-group">
                        <h1>{greeting}, <span className="name-accent">{username}</span></h1>
                        <p>Welcome the Admin.</p>
                    </div>
                    <div className="date-display">
                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </header>
                
                <div className="stats-grid">
                    <div className="stats-card">
                        <h3>Total Members</h3>
                        <p className="stats-number">{totalMembers}</p>
                    </div>
                    <div className="stats-card">
                        <h3>Completed Profiles</h3>
                        <p className="stats-number completed-text">{completedProfiles}</p>
                    </div>
                    <div className="stats-card">
                        <h3>Pending Setup</h3>
                        <p className="stats-number pending-text">{pendingProfiles}</p>
                    </div>
                </div>

                <div className="admin-card">
                    <div className="admin-header-flex">
                        <div>
                            <h2>Member Management</h2>
                            <p>Viewing all registered users and their profile status</p>
                        </div>
                        
                        <div className="controls-group">
                            <input 
                                type="text" 
                                placeholder="Search by name, email, phone..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select 
                                className="filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Profiles</option>
                                <option value="completed">Completed Only</option>
                                <option value="pending">Pending Only</option>
                            </select>
                        </div>
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
                                        <th>Action</th>
                                        <th>Status</th>
                                        <th>Toggle Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map((member) => (
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
                                            <td>
                                                <button className="action-view-btn" onClick={() => navigate(`/admin/members/${member.user_id}`)}>View</button>
                                            </td>
                                            
                                            <td>
                                                {/* STATUS BADGE - Based on role column */}
                                                <span className={`status-tag ${member.role !== 'suspended' ? 'active' : 'suspended'}`}>
                                                    {member.role !== 'suspended' ? 'Active' : 'Suspended'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="action-view-btn" onClick={() => navigate(`/admin/members/${member.user_id}`)}>View</button>
                                                                        
                                                    {/* DYNAMIC TOGGLE BUTTON - Based on role column */}
                                                    <button 
                                                        className={`action-toggle-btn ${member.role !== 'suspended' ? 'btn-suspend' : 'btn-activate'}`}
                                                        onClick={() => handleToggleStatus(member.user_id, member.role)}
                                                    >
                                                        {member.role !== 'suspended' ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                    {filteredMembers.length === 0 && (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.4)' }}>
                                                No members found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;