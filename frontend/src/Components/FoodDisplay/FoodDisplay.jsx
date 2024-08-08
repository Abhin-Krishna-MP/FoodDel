import React, { useContext } from 'react'
import './FoodDisplay.css'
import { storeContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({Category}) => {
  const {food_list,Token} = useContext(storeContext)
  return (
    <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
        <div className="food-display-list"> 
            {food_list.map((item,index)=>{
                if(Category==="All"|| Category===item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay