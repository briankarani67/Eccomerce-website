import React from 'react'
import Button from '../../reusedcomponents/Button'
import './About.css'

function Aboutus() {
  return (
    <div>
      <div className="about">
        <div className="aboutLeft">
          <p className='.p'>LATEST PROJECT</p>
          <h1>Academic Writing Assistant</h1>
          <p>From April 20th</p>
          <Button text="Start now" onclick={() => alert("View Project button clicked")} />
            <h3>Learn Skills for academic writing!</h3>
            <ul style={{}}>
              <li>Research</li>
              <li>Writing</li>
              <li>Proofreading</li>
              <li>Plagearism Check</li>
            </ul>
        </div>
        <div className="aboutRight">
          <h2>Who are Braines</h2>
          <h1>A TOP BUSSINESS PLATFORM IN AFRICA</h1>
          <p>Aim is bringing the world closer to you as we Walk Grow Together . We allow members to market our products on the platform and buyers to buy anything they want from the platform. The company still offers other business opportunities that you can make money.</p>

          <ol>
            <li>Freelance Jobs /Academic writing</li>
            <li>Transcription jobs</li>
            <li>Network Marketing</li>
            <li>braines Gaming Platform</li>
            <li>Braines Academy</li>
          </ol>
        </div>
       </div>
    </div>
  )
}

export default Aboutus