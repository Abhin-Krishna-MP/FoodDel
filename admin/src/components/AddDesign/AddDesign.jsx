import React, { useEffect, useState } from 'react'
import './AddDesign.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddDesign = () => {
    const [image, setImage] = useState(false)
    const [Data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    useEffect(() => {
      console.log(Data)
    }, [Data])
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const url = "http://localhost:4000"
        const formData = new FormData()
        formData.append('name',Data.name)
        formData.append('description',Data.description)
        formData.append('price',Number(Data.price))
        formData.append('category',Data.category)
        formData.append('image',image)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if (response.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData(Data=>({...Data,[name]:value}))
    }

    return (
        <div className='add'>
            <form className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={Data.name} type="text" name="name" placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={Data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={Data.price} type="Number" name="price" placeholder='$20' />
                    </div>
                </div>
                <button type='submit' onClick={onSubmitHandler} className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default AddDesign