import { createContext,useState } from "react";
import {food_list} from '../assets/assets'
export const storeContext = createContext(null)

function storeContextProvider({children}){
    const [CartItems, setCartItems] = useState({})
    const addToCart = (itemId)=>{
        if(!CartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalAmount = ()=>{
        let totalAmount = 0
        for(const item in CartItems){
            if (CartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * CartItems[item]
            }
        }
        return totalAmount
    }

    const contextValue={
        food_list,
        CartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount
    }
    return(
    <storeContext.Provider value={contextValue}>
        {children}
    </storeContext.Provider>
    )
}

export default storeContextProvider