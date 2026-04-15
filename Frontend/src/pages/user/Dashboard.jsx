import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Transfer from '../../userservices/Transfer'
import Withdraw from '../../userservices/Withdraw'
import UserDashboard from '../../userservices/UserDashboard'
import Team from '../../userservices/Team'
import Transaction from '../../userservices/Transaction'
import Profile from '../../userservices/Profile'
import Logout from '../../userservices/Logout'
import "./Dashboard.css"



function Dashboard() {
  return (
    <>
        <div className='dashboard'>
            <div className="leftDashboard">
                <nav>
                <ul className="sidebar">
                <li><Link className="side-link" to="/dashboard">Dashboard</Link></li>
                <li><Link className="side-link" to="/dashboard/transfer">Transfer Money</Link></li>
                <li><Link className="side-link" to="/dashboard/withdraw">Withdraw Money</Link></li>
                <li><Link className="side-link" to="/dashboard/team">Team</Link></li>
                <li><Link className="side-link" to="/dashboard/transaction">Transaction</Link></li>
                <li><Link className="side-link" to="/dashboard/profile">My Profile</Link></li>
                <li><Link className="side-link" to="/dashboard/logout">Logout</Link></li>
            </ul>
                </nav>
            </div>
            <div className="rightDashboard">
                <Routes>
                    <Route path="/" element={<UserDashboard/>} />
                    <Route path="transfer" element={<Transfer/>} />
                    <Route path="withdraw" element={<Withdraw/>} />
                    <Route path="team" element={<Team/>} />
                    <Route path="transaction" element={<Transaction/>} />
                    <Route path="profile" element={<Profile/>} />
                    <Route path="logout" element={<Logout/>} />
                </Routes>
            </div>
        </div>
    </>
  )
}

export default Dashboard