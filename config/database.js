const mongoose=require("mongoose");
require('dotenv').config();
const MongoDB=process.env.MONGO_URL;
const connectDB=async()=>{//it is async function
    await mongoose.connect(MongoDB,{
        useUnifiedTopology:true,
    });
    console.log("mongodb is connected");
};
module.exports=connectDB;
/**using module.exports you can  use anty function or variable in other file also when you also import this export file in those file in which you want to use */