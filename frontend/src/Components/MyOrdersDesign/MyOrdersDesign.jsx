import React, { useContext, useEffect, useState } from 'react'
import './MyOrdersDesign.css'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
const MyOrdersDesign = () => {
    const {url,Token} = useContext(storeContext)
    const [Data, setData] = useState([])

    const fetchData = async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{Token}})
        setData(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        if(Token){
            fetchData()
        }
    }, [Token])
    


  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {Data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index == order.items.length-1){
                                return item.name+"x"+item.quantity
                            }else{
                                return item.name+"x"+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchData}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrdersDesign