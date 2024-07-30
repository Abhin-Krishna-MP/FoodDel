import { createContext,useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const storeContext = createContext(null)

function storeContextProvider({children}){
    const [CartItems, setCartItems] = useState({})
    const [food_list, setfoodData] = useState([])
    const url = "http://localhost:4000"
    const [Token, setToken] = useState("")
    const [userName, setuserName] = useState('')

    const addToCart = async(itemId)=>{
        if(!CartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if({Token}){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{Token}})
        }
    }
    
    const removeFromCart= async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if({Token}){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{Token}})
        }
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    const fetchData = async()=>{
        const foodList = await axios.get(`${url}/api/food/list`)
        setfoodData(foodList.data.data)
        console.log(foodList.data.data)
    }

    useEffect(() => {
        async function loadData(){
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                setuserName(localStorage.getItem('name'))
            }
            await fetchData()
            await loadCartData(localStorage.getItem("token"))
        }
        loadData()
    }, [])

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
        CartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        Token,
        setToken,
        userName,
        setuserName,
        loadCartData,
        food_list
    }
    return(
    <storeContext.Provider value={contextValue}>
        {children}
    </storeContext.Provider>
    )
}

export default storeContextProvider