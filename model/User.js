const Mongoose=require("mongoose");
const UserSchema=new Mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minlength:10,
        required:true,
    },
    role:{
        type:String,
        default:"Basic",
        required:true,
    },
});
const User=Mongoose.model("user",UserSchema);//here user is user model name and schema is user schema
module.exports=User;

