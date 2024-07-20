import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import{Link} from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
const Navbar = ({setShowLogin}) => {
    const [Menu, setMenu] = useState('Home')
    const {getTotalAmount} = useContext(storeContext)
    
  return (
    <div  className='navbar'>
        <Link to="/"><img className='logo' src={assets.logo} alt="" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>{setMenu("Home")}}  className={Menu === "Home" ? "active" : ' '} >Home</Link>
            <a href='#explore-menu' onClick={()=>{setMenu("Menu")}} className={Menu === "Menu" ? "active" : ' '} >Menu</a>
            <a href='#app-download' onClick={()=>{setMenu("Mobile-App")}} className={Menu === "Mobile-App" ? "active" : ' '} >Mobile-App</a>
            <a href='#footer' onClick={()=>{setMenu("Contact us")}} className={Menu === "Contact us" ? "active" : ' '} >Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={!getTotalAmount() ?'':"dot"}></div>
            </div>
            <button onClick={()=>{setShowLogin(true)}} >Sign in</button>
        </div>
    </div>
  )
}

export default Navbar