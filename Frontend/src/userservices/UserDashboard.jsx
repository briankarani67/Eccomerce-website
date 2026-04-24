

import React, { useEffect, useState } from 'react';
import { getGreeting } from '../utils/Helper'; // The helper we made earlier
import './UserDashboard.css';

const DashboardHome = () => {
    const [username, setUsername] = useState("");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        setGreeting(getGreeting());

        // Retrieving the name you registered in the database
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username) {
            setUsername(storedUser.username);
        }
    }, []);

    return (
        <div className="dashboard-home-content">
            <header className="home-header">
                <div className="text-group">
                    <h1>{greeting}, <span className="name-accent">{username}</span></h1>
                    <p>Welcome to your Braines workspace.</p>
                </div>
                <div className="date-display">
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </header>

            <div className="stats-grid">
                <div className="glass-card">
                    <h4>Total Projects</h4>
                    <p className="stat-number">12</p>
                </div>
                <div className="glass-card">
                    <h4>Pending Tasks</h4>
                    <p className="stat-number">4</p>
                </div>
                <div className="glass-card">
                    <h4>System Status</h4>
                    <p className="stat-status">Operational</p>
                </div>
            </div>

            <section className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    <p>No new notifications at this time.</p>
                </div>
            </section>
        </div>
    );
};

export default DashboardHome;