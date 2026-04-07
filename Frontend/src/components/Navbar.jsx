import React from 'react';
import './Navbar.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/landing/Home';
import About from '../pages/landing/About';
import Announcement from '../pages/landing/Announcement';
import Contact from '../pages/landing/Contact';

function Navbar() {
  return (
    <div>
        <nav className="navbar">
            <h2 className='myappname'><Link to="/" className="logo">BRAINNES</Link></h2>
            <div className='right'>
            <ul className="navbar1">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
                <li><Link className="nav-link" to="/announcement">Announcement</Link></li>
                <li><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
            </div>
        </nav>

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/announcement" element={<Announcement/>} />
            <Route path="/contact" element={<Contact/>} />
        </Routes>

    </div>
  )
}

export default Navbar