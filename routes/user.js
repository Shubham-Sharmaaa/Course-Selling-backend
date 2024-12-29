const express = require("express");
const userRouter= express.Router();
const jwt = require("jsonwebtoken");
const {UserModel,PurchasesModel}=require("../db");
const {JWT_SECRET} = require("../middleware/auth");
const {auth} = require("../middleware/auth");
userRouter.post("/signup",async (req, res)=>{
    const {username,email,password} = req.body;
    await UserModel.create({username:username,email:email,password:password});
    res.status(200).json({
        msg:"signed in"
    })
})
userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email:email,password:password});
    if(user){
        const token = jwt.sign({id:user._id},JWT_SECRET)
        res.status(200).json({
            token:token
        })
    }
    else{
        res.status(403).json({"err":"INVALID CREDENTIALS"})
    }
})
userRouter.use(auth)
userRouter.get("/my-courses",async (req,res)=>{
    console.log(req.decodedtoken.id)
    const courses = await PurchasesModel.find({userId : req.decodedtoken.id})
    res.status(200).send({courses:courses})
})
module.exports = userRouter