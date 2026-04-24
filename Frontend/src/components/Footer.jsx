

import React from 'react';
import './Footer.css';
import logo from '../assets/images/logoo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          <img src={logo} alt="logo" className="footer-logo" />
          <p className="footer-description">
            Thank you for choosing <strong>Braines</strong> as your trusted partner to earn online. 
            We are committed to providing you with a secure experience.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h4>Platform</h4>
          <Link to="/about">About Us</Link>
          <Link to="/announcement">Announcements</Link>
          <Link to="/contact">Contact Support</Link>
        </div>

        {/* Legal Section */}
        <div className="footer-legal">
          <h4>Legal</h4>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Braines. All rights reserved.</p>
        <div className="social-placeholders">
          <span>FB</span> | <span>IG</span> | <span>X</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;