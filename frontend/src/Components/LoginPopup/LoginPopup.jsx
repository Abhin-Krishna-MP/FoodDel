import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLogin}) => {
    const [CurrStatus, setCurrStatus] = useState('Sign up')
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{CurrStatus}</h2>
                <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {CurrStatus==="Login"?"":<input type="text" placeholder='Your name' required />}
                <input type="email" placeholder='Your email' required />
                <input type="password" placeholder='Password'  required/>
            </div>
            <button>{CurrStatus==="Sign up"?"Create account": "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {
                CurrStatus==="Sign up" ? <p>Already have an account ? <span onClick={()=>{setCurrStatus("Login")}}>Login here</span></p>
                :<p>Create new account ? <span onClick={()=>{setCurrStatus("Sign up")}}>Click here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup