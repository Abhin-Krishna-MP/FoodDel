import React, { useContext, useEffect, useState } from 'react'
import './OrderDesign.css'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const OrderDesign = () => {
  const {getTotalAmount,food_list,CartItems,url,Token} = useContext(storeContext)
  const [Data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setData(Data=>({...Data,[name]:value}))
  }

  const callrazorpay = (orderData,orderId) => {
    console.log(orderData.id)
    const homeurl = 'http://localhost:5173'
    const key_id = 'rzp_test_I9gB04XEiTHhvY'
    var options = {
      "key": key_id, // Enter the Key ID generated from the Dashboard
      "amount": orderData.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": orderData.currency,
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
        window.location.replace(`${homeurl}/verify?success=true&orderId=${orderId}`)  
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      location.href= `${homeurl}/verify?success=false&orderId=${orderId}`
    });
    }
  
  const placeOrder = async (e)=>{
    e.preventDefault()
    console.log(food_list)
    let orderitems = []
    food_list.map((item)=>{
      if(CartItems[item._id]>0){
        let itemInfo = item
        itemInfo["quantity"] = CartItems[item._id]
        orderitems.push(itemInfo)
      }
    })
    let orderData = {
      address:Data,
      items:orderitems,
      amount:getTotalAmount()+2,
    }

    let response =await axios.post(url+'/api/order/place',orderData,{headers:{Token}})
    if(response.data.success){
      await callrazorpay(response.data.orderData,response.data.orderId)
    }
    else{
      alert("Error")
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if(!Token){
      navigate('/cart')
    }else if(getTotalAmount()===0){
      navigate('/cart')
    }
  }, [Token])
  
  


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} required name='lastName' value={Data.lastName} type="text" placeholder='Last name' />
          <input onChange={onChangeHandler} required name='firstName' value={Data.firstName}  type="text" placeholder='First name' />
        </div>
        <input onChange={onChangeHandler} required name='street' value={Data.street} type="text" placeholder='Street' />
        <input onChange={onChangeHandler} required name='email' value={Data.email} type="email" placeholder='Email address' />
        <div className="multi-fields">
          <input onChange={onChangeHandler} required name='city' value={Data.city} type="text" placeholder='City' />
          <input onChange={onChangeHandler} required name='state' value={Data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} required name='zipcode' value={Data.zipcode} type="text" placeholder='Zip code' />
          <input onChange={onChangeHandler} required name='country' value={Data.country} type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} required name='phone' value={Data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${!getTotalAmount() ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalAmount() + (!getTotalAmount() ? 0 : 2)}</b>
              </div>
            </div>
            <button type='submit' >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default OrderDesign