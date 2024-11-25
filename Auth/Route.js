// in route.js file we need to create a route to register using our express.router
const express=require("express");
const router=express.Router();
const {adminAuth}=require("../middleware/auth");
const {register,login,update,deleteUser,getUsers}=require('./Auth');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getusers').get(getUsers);
router.route('/update').put(adminAuth,update);
router.route('/delete').delete(adminAuth,deleteUser);
module.exports=router;