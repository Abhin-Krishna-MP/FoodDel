import express from 'express'
import { getCartItems,addToCart,removeFromCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post("/add",authMiddleware,addToCart)
userRouter.post("/remove",authMiddleware,removeFromCart)
userRouter.post("/get",authMiddleware,getCartItems)

export default userRouter