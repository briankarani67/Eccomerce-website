import React from 'react'
import './Button.css'

function Button({ text, onclick }) {
  return (
    <div>
        <button className="button" onClick={onclick}>{text}</button>
    </div>
  )
}

export default Button