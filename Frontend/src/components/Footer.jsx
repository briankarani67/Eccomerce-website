import React from 'react'
import './Footer.css'
import logo from '../assets/images/logoo.png';

function Footer() {
  return (
    <div>
      <hr style={{ border: 0, height: '2px', background: 'wheat', width: '100%' }} />
      <div className="up">
        
        <img src={logo} alt="logo" style={{height:70}}/>
        <p>Thank you for choosing Braines as your trusted partner to earn <br/> online. We are committed to providing you with secure experience.</p>
        <p>Terms and conditions</p>
      </div>
      <hr style={{ border: 0, height: '2px', background: 'wheat', width: '100%' }} />
        <footer>
            <p>&copy; 2026 My App. All rights reserved.</p>
        </footer>
        

    </div>
  )
}

export default Footer