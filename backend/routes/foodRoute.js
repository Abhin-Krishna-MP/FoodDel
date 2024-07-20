import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

//Image store Engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post('/add',upload.single("image"),async(req,res)=>{
    let food = await addFood(req.body,req.file)
    try {
        food.save()
        res.json({success:true,message:"Food item added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
})

foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)


export default foodRouter
