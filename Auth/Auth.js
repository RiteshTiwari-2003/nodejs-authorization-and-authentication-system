const User=require("../model/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const jwtSecret=process.env.jwtSecret;
//register function
exports.register=async(req,res,next)=>{
    const {username,password}=req.body;
    if (password.length<10){
        return res.status(400).json({message:"Password is less than character "});
    }
    bcrypt.hash(password,10).then(async(hash)=>{
        await User.create({username,password:hash,}).then(user=>{const maxAge=3*60*60;
            const token=jwt.sign({id:user._id,username,role:user.role},jwtSecret,{expiresIn:maxAge});
            res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:maxAge*1000,
        });
        res.status(200).json({message:"user successfully created",user:user._id,token,});}).catch(error=>res.status(401).json({message:"user not successfully created",error:error.message,}));
    });
};
exports.login=async(req,res,next)=>{
    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({message:"Username and password is not provided"});
    }
    try{
        const user=await User.findOne({username});
        if(!user){
            res.status(401).json({message:"login is not successful",error:"user not found"});
        }
        else{
            bcrypt.compare(password,user.password).then(function(result){ if(result){
                const maxAge=3*60*60;
            const token=jwt.sign({id:user._id,username,role:user.role},jwtSecret,{expiresIn:maxAge});
            res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:maxAge*1000,
        });
            res.status(200).json({message:"login is successful",user:user._id,token,})}
            else{res.status(400).json({message:"Login not successfull"});}
        });}
    }
    catch(error){
        res.status(400).json({message:"Error occured",error:error.message});

    }

};
exports.update=async(req,res,next)=>{
    const{role,id}=req.body;
    if(role&&id){
        if(role==="admin"){
            await User.findById(id).then((user)=>{
                if(user.role!="admin"){
                    user.role=role;
                    user.save((err)=>{
                        if (err){
                            res.status(400).json({mrssage:"error occured",error:err.message});process.exit(1);}
                    },
                    res.status(201).json({message:"user updated successfully",user})
                    );
                }
                else{
                    res.status(400).json({message:"user is already a admin"});
                }
            }).catch((error)=>{
                res.status(400).json({message:"a error occured",error:error.message});
            })
        }
        else{
            res.status(400).json({message:"role is not admin",})
        }

    }
    else{
        res.status(400).json({message:"role or id is not present or not provide"});
    }
};
exports.deleteUser=async(req,res,next)=>{
    const {id}=req.body;
    await User.findById(id).then(user=>user.deleteOne()).then(user=>{res.status(201).json({message:"User successfully deleted",user})}).catch(error=>{res.status(400).json({message:"An error occured",error:error.message})});
};
exports.getUsers=async(req,res,next)=>{
    await User.find({}).then((users)=>{
        const userfunction=users.map((user)=>{
            const container={};
            container.username=user.username;
            container.role=user.role;
            return container;
        })
        res.status(200).json({user : userfunction});
    })
    .catch(err=>res.status(401).json({message:"not successfull",error:err.message}));
};

