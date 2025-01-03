import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

//user token create
const createToken = (id)=>{
    return jwt.sign({id},process.env.JKT_SECRET)
}

//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User doesnt exist"})
        } 

        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token,name:user.name})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

//register user 
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        //Checking if user exist
        const userexist = await userModel.findOne({email})
        if (userexist){
            return res.json({success:false,message:"User already exist"})
        }
        //validating user emal and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token,name:user.name})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"ERROR"})
    }
}

export {loginUser,registerUser} 