import React from 'react'
import { useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import Transfer from '../../userservices/Transfer'
import Withdraw from '../../userservices/Withdraw'
import UserDashboard from '../../userservices/UserDashboard'
import Team from '../../userservices/Team'
import Transaction from '../../userservices/Transaction'
import Profile from '../../userservices/Profile'
import Logout from '../../userservices/Logout'
import "./Dashboard.css"
import logo from '../../assets/images/logoo.png';




function Dashboard() {
    const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setShowModal(false);
    
    navigate("/"); 
  };

  
    function movetohome() {
      navigate('/');   
    }
  return (
    <>
        <div className='dashboard'>
            <div className="leftDashboard">
                <h1 onClick={movetohome} style={{height:50, top:0}}><img src={logo} alt="logo" style={{height:50}}/></h1>
                <nav>
                <ul className="sidebar">
                <li><Link className="side-link" to="/dashboard">Dashboard</Link></li>
                <li><Link className="side-link" to="/dashboard/transfer">Transfer Money</Link></li>
                <li><Link className="side-link" to="/dashboard/withdraw">Withdraw Money</Link></li>
                <li><Link className="side-link" to="/dashboard/team">Team</Link></li>
                <li><Link className="side-link" to="/dashboard/transaction">Transaction</Link></li>
                <li><Link className="side-link" to="/dashboard/profile">My Profile</Link></li>
                <li><button className="side-link logout-btn" onClick={() => setShowModal(true)}>Logout</button></li>
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
            {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button className='cancelbtn' onClick={() => setShowModal(false)}>Close</button>
              <button className='yesbtn' onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
        </div>
    </>
  )
}

export default Dashboard