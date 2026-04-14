import React from 'react'
import Footer from '../../components/Footer'
import freelance from '../../assets/images/freelancelog.png'
import './Home.css'
import Button from '../../reusedcomponents/Button'
import Aboutus from './Aboutus'

function Home() {
  return (
    <div className="homecont">
      <div className="hero">
        <div className="leftsidehero">
          <h2>Welcome to Braines</h2>
          <h1>1 Year of full working</h1>
          <p>With top most services earn on your own schedule, EARN AS YOU WISH.</p>
          <div className="auth">
            <Button text="Login" onclick={() => alert("Login button clicked")} />
            <Button text="Sign up" onclick={() => alert("Sign up button clicked")} />
          </div>
        </div>
        <div className="rightsidehero">
          <img src={freelance} alt="Freelance" />
        </div>
        
      </div>
      <Aboutus/>
        <Footer/>
    </div>
  )
}

export default Home