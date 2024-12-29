const express = require("express");
const adminrouter   = express.Router();
const jwt = require("jsonwebtoken");
const {AdminModel}=require("../db");
const {JWT_SECRET_ADMIN} = require("../middleware/auth");
adminrouter.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
    await AdminModel.create({Adminname:name,email:email,password:password});
    res.status(200).send("Admin ADDED")
})

adminrouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    const user =await  AdminModel.findOne({email:email,password:password})
    if(user){
        const admintoken = jwt.sign({id:user._id},JWT_SECRET_ADMIN)
        res.status(200).json({
            "admintoken":admintoken
        })
    }
})
module.exports = adminrouter