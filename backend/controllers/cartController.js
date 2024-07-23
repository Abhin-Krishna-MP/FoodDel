import userModel from '../models/userModel.js'


// add cart items

const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartitems
        console.log(cartData)
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }else{
            cartData[req.body.itemId] +=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartitems:cartData})
        res.json({success:true,message:"Added To Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// remove cart items

const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartitems
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartitems:cartData})
        res.json({success:true,message:"Item removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//fetch cart items 

const getCartItems = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartitems
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}


export {addToCart,removeFromCart,getCartItems}