import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://abhinkrishnamp6:9496289271@cluster0.34paapb.mongodb.net/food-del').then(()=>console.log("DB connected"))
}
