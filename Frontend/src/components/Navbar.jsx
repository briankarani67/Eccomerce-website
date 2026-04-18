import React from 'react';
import './Navbar.css';
import {Link } from 'react-router-dom';
import Button from '../reusedcomponents/Button';
import logo from '../assets/images/logoo.png';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');   
  }
            
    function handleSignup () {
               navigate('/signup'); 
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

    </div>
  )
}

export default Navbar