// import React from 'react';
// import './Navbar.css';
// import {Link } from 'react-router-dom';
// import Button from '../reusedcomponents/Button';
// import logo from '../assets/images/logoo.png';
// import { useNavigate } from 'react-router-dom';


// function Navbar() {
//     const navigate = useNavigate();

//   function handleLogin() {
//     navigate('/login');   
//   }
            
//     function handleSignup () {
//                navigate('/signup'); 
//             }
//   return (
//         <nav className="navbar">
//             <h2 className='myappname'><Link to="/" className="logo"><img src={logo} alt="logo" style={{height:50}}/></Link></h2>
//             <div className='right'>
//             <ul className="navbar1">
//                 <li><Link className="nav-link" to="/">Home</Link></li>
//                 <li><Link className="nav-link" to="/about">About</Link></li>
//                 <li><Link className="nav-link" to="/announcement">Announcement</Link></li>
//                 <li><Link className="nav-link" to="/contact">Contact</Link></li>
//             </ul>
//             <Button text="Login" onclick={handleLogin} />
//             <Button text="Sign up" onclick={handleSignup} />
            
//             </div>
//         </nav>
//   )
// }

// export default Navbar

import React, { useState } from 'react'; // Added useState
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../reusedcomponents/Button';
import logo from '../assets/images/logoo.png';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    const handleLogin = () => navigate('/login');
    const handleSignup = () => navigate('/signup');
    
    // Function to close menu when a link is clicked
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <h2 className='myappname'>
                <Link to="/" className="logo" onClick={closeMenu}>
                    <img src={logo} alt="logo" style={{ height: 50 }} />
                </Link>
            </h2>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span className={isOpen ? "bar open" : "bar"}></span>
                <span className={isOpen ? "bar open" : "bar"}></span>
                <span className={isOpen ? "bar open" : "bar"}></span>
            </div>

            {/* Right Section (Links + Buttons) */}
            <div className={`right ${isOpen ? "active" : ""}`}>
                <ul className="navbar1">
                    <li><Link className="nav-link" to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link className="nav-link" to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link className="nav-link" to="/announcement" onClick={closeMenu}>Announcement</Link></li>
                    <li><Link className="nav-link" to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
                <div className="nav-buttons">
                    <Button text="Login" onclick={() => { handleLogin(); closeMenu(); }} />
                    <Button text="Sign up" onclick={() => { handleSignup(); closeMenu(); }} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;