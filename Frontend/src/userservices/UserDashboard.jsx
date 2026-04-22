// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getGreeting } from '../utils/helper';
// import './UserDashboard.css';

// const Dashboard = () => {
//     const [user, setUser] = useState(null);
//     const [greeting, setGreeting] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         // 1. Get user from storage
//         const savedUser = JSON.parse(localStorage.getItem('user'));
//         const token = localStorage.getItem('token');

//         // 2. Security Check: If no token, kick them to login
//         if (!token || !savedUser) {
//             navigate('/login');
//         } else {
//             setUser(savedUser);
//             setGreeting(getGreeting());
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     if (!user) return null; // Prevent flicker before redirect

//     return (
//         <div className="dashboard-container">
//             <aside className="sidebar">
//                 <div className="sidebar-logo">Braines</div>
//                 <nav>
//                     <ul>
//                         <li className="active">Overview</li>
//                         <li>My Orders</li>
//                         <li>Settings</li>
//                         <li onClick={handleLogout} className="logout-btn">Logout</li>
//                     </ul>
//                 </nav>
//             </aside>

//             <main className="dashboard-content">
//                 <header className="dashboard-header">
//                     <div className="welcome-text">
//                         <h2>{greeting}, <span className="highlight">{user.username}</span></h2>
//                         <p>Welcome back to your control panel.</p>
//                     </div>
//                     <div className="user-profile">
//                         <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
//                     </div>
//                 </header>

//                 <section className="stats-grid">
//                     <div className="stat-card">
//                         <h4>Total Orders</h4>
//                         <p>0</p>
//                     </div>
//                     <div className="stat-card">
//                         <h4>Account Status</h4>
//                         <p className="status-active">Active</p>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { getGreeting } from '../utils/helper'; // The helper we made earlier
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