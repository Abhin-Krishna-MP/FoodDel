import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food-item
const addFood = async(foodItem,image)=>{
    let image_filename = `${image.filename}`
    const food = new foodModel({
        name:foodItem.name,
        description:foodItem.description,
        price:foodItem.price,
        category:foodItem.category,
        image:image_filename
    })
    return food
}

//all food list
const listFood = async(req,res)=>{
    try {
        const food = await foodModel.find({})
        res.json({success:true,data:food})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async(req,res)=>{
    try {
        const food =await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}