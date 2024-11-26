const express = require("express");
const cors=require("cors");
const authRoutes = require("./Auth/Route");
const cookieParser=require("cookie-parser")
require('dotenv').config();
const {adminAuth,userAuth}=require('./middleware/auth');

const app=express();
const connectDB=require('./config/database');//we are importing database in server.js

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views", "./views");
app.get("/",(req,res)=>{res.render("home")});
app.get("/register",(req,res)=>{res.render("register")});
app.get("/login",(req,res)=>{res.render("login")});
app.get("/getusers",(req,res)=>{res.render("user")})
app.get("/admin",adminAuth,(req,res)=>{res.render("admin")});
app.get("/basic",userAuth,(req,res)=>{res.render("user")});
app.get("/logout",(req,res)=>{
    res.cookie("jwt","",{maxAge:"1"});
    res.redirect("/")
})
//now we need to create a async express function that will take the user data and register in our database

app.use('/api/auth',authRoutes);
app.use(cors());



app.get("/admin",adminAuth,(req,res)=>res.send("Admin Route"));
app.get("/basic",userAuth,(req,res)=>res.send("user Route"));


const PORT=process.env.PORT|| 5000;
const server=app.listen(PORT,()=>{console.log(`server is successfully run on ${PORT}`)});//on this port my server is running
/**mongodb connection problem occur so for removing this problem we use below statement process.on that when any error come that error message print
 * and server close and exit.
 */
process.on('unhandledRejection',err=>{//when error come in mongodb connect it print the error response and exit the server using server.exit(1)
    console.log(`error occured: ${err.message}`);
    server.close(()=>process.exit(1));
})
