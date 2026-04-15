import React from 'react';
import './Navbar.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/landing/Home';
import About from '../pages/landing/About';
import Announcement from '../pages/landing/Announcement';
import Contact from '../pages/landing/Contact';
import Button from '../reusedcomponents/Button';
import logo from '../assets/images/logoo.png';
import Dashboard from '../pages/user/Dashboard';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();

  function handleLogin() {
    navigate('/dashboard');   
  }
            
    function handleSignup () {
                alert("Sign up button clicked");
            }
  return (
    <div>
        <nav className="navbar">
            <h2 className='myappname'><Link to="/" className="logo"><img src={logo} alt="logo" style={{height:50}}/></Link></h2>
            <div className='right'>
            <ul className="navbar1">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
                <li><Link className="nav-link" to="/announcement">Announcement</Link></li>
                <li><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
            <Button text="Login" onclick={handleLogin} />
            <Button text="Sign up" onclick={handleSignup} />
            
            </div>
        </nav>

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/announcement" element={<Announcement/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>

    </div>
  )
}

export default Navbar