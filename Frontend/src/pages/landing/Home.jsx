import React from 'react'
import freelance from '../../assets/images/freelancelog.png'
import './Home.css'
import Button from '../../reusedcomponents/Button'
import Aboutus from './Aboutus'
import { useNavigate } from 'react-router-dom';

function Home() {
   const navigate = useNavigate();
  
    function handleLogin() {
      navigate('/login');   
    }
              
      function handleSignup () {
                 navigate('/signup'); 
              }
  return (
    <div className="homecont">
      <div className="hero">
        <div className="leftsidehero">
          <h2>Welcome to Braines</h2>
          <h1>1 Year of full working</h1>
          <p>With top most services earn on your own schedule, EARN AS YOU WISH.</p>
          <div className="auth">
            <Button text="Login" onclick={handleLogin} />
            <Button text="Sign up" onclick={handleSignup} />
          </div>
        </div>
        <div className="rightsidehero">
          <img src={freelance} alt="Freelance" />
        </div>
        
      </div>
      <Aboutus/>
    </div>
  )
}

export default Home