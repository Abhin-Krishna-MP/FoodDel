import React, { useContext, useEffect, useState } from 'react'
import './VerifyDesign.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
const VerifyDesign = () => {
    const [searchParams, setParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(storeContext)
    const navigate = useNavigate()

    const verifyPayment = async() =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if (response.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
      verifyPayment()
    }, [])
    
  return (
    <div  className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default VerifyDesign