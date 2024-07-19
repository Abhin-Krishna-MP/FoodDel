import React, { useState } from 'react'
import './ExploreMenu.css'
import {assets, menu_list} from '../../assets/assets'
export const ExploreMenu = ({Category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Exlore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with finest ingredients and culinary expertise. Our mission is to satisfy your cravings elevate your dining experience, one delicious meal at a time.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>{setCategory((prev)=>prev===item.menu_name ? 'All' : item.menu_name)}} key={index} className="explore-menu-list-item">
                        <img className={Category===item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
