import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { storeContext } from '../../Context/StoreContext'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
  
const FoodItem = ({id,name,price,description,image}) => {
    const [Count, setCount] = useState(0)
    const{CartItems,addToCart,removeFromCart,url,Token} = useContext(storeContext)
 
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src= {url+"/images/"+image} alt="" className="food-item-image" />
            {
             Token ? 
                !CartItems[id]? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                : 
                <div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{CartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
             :  <img className='add' onClick={()=>{toast.error("Login to Add-to-Cart")}} src={assets.add_icon_white} alt="" />
        }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem