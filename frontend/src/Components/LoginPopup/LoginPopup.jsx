import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
    const [CurrStatus, setCurrStatus] = useState('Sign up')
    const {url,Token,setToken,setuserName,loadCartData} = useContext(storeContext)
    const [Data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData((Data)=>({...Data,[name]:value}))
    }

    const onLogin = async (e)=>{
        e.preventDefault()
        let newUrl = url;
        if(CurrStatus==="Login"){
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl,Data)
        if(response.data.success){
            setToken(response.data.token)
            setuserName(response.data.name)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("name",response.data.name)
            setShowLogin(false)
            location.reload()
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{CurrStatus}</h2>
                <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {CurrStatus==="Login"?"":<input type="text" onChange={onChangeHandler} name='name' value={Data.name} placeholder='Your name' required />}
                <input onChange={onChangeHandler} name='email' value={Data.email} type="email" placeholder='Your email' required />
                <input type="password" name='password' value={Data.password} onChange={onChangeHandler} placeholder='Password'  required/>
            </div>
            <button type='submit' >{CurrStatus==="Sign up"?"Create account": "Login"}</button>
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