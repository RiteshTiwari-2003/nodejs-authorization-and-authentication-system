const mongoose=require("mongoose");
require('dotenv').config();
const MongoDB=process.env.MONGO_URL;
const connectDB=async()=>{
    await mongoose.connect(MongoDB,{
        useUnifiedTopology:true,
    });
    console.log("mongodb is connected");
};
module.exports=connectDB;