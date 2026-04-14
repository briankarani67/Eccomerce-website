import React from 'react'
import Button from '../../reusedcomponents/Button'

function Login() {
  return (
    <div>
        <h1>Login Page</h1>
        <form>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" />
            </div>
            <Button text="Login" onclick={() => alert("Login button clicked")} />
        </form>

    </div>
  )
}

export default Login