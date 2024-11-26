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
//for create user login we create login async function like register function
exports.login=async(req,res,next)=>{
    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({message:"Username and password is not provided"});
    }
    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Login not successful", error: "User not found" });
        }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Login not successful", error: "Invalid credentials" });
    }

    // Generate token on successful login
    const maxAge = 3 * 60 * 60; // 3 hours
    const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
        expiresIn: maxAge,
    });

    // Set cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
    });

    // Send success response
    return res.status(200).json({
        message: "Login is successful",
        user: user._id,
        token,
    });
} catch (error) {
    // Handle errors
    return res.status(500).json({
        message: "An error occurred during login",
        error: error.message,
    });
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
exports.getUsers = async (req, res, next) => {
    try {
        let filter = {};
        if (req.path === "/admin") {
            filter = { role: "admin" };
        }

        const users = await User.find(filter);
        const userList = users.map(user => ({
            username: user.username,
            role: user.role,
        }));

        return res.status(200).json({ users: userList });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

