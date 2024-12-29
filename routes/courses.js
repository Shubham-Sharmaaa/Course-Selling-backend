const express = require("express");
const courserouter = express.Router();
const {UserModel,CoursesModel,PurchasesModel}=require("../db");
const {auth,authadmin} = require("../middleware/auth");
courserouter.use(express.json());
courserouter.post("/create", authadmin,async (req,res)=>{
    try{const{CourseName}=req.body;
    await CoursesModel.create({CourseName:CourseName,CourseContent:""})
    res.status(200).json({"msg":"course created"})}
    catch (err){
        res.status(402).send("some error")
    }
})
courserouter.put("/addContent",authadmin,async (req,res)=>{
    try{const {CourseName,CourseContent}=req.body;
    await CoursesModel.updateOne({
        CourseName:CourseName},{
            $set:{
                CourseContent:CourseContent,
            }
        })
    res.status(200).send({msg:"CourseContent ADDED"})}
    catch(error){
        res.status(510).send("some error")
    }
})
courserouter.delete("/delete",authadmin,async (req,res)=>{
    const {CourseName}=req.body;
    const response = await CoursesModel.deleteOne({CourseName:CourseName})
    if(response){
        res.status(200).send("course deleted")
    }else return res.status(400).send("course dont exist")
})
courserouter.post("/purchase",auth,async (req,res)=>{
    try{const {CourseName}=req.body;
    const user = await UserModel.findOne({_id:req.decodedtoken.id});
    await PurchasesModel.create({userId:user._id,CourseName:CourseName,})
    res.status(200).json({"msg":"course bought successfully"})}
    catch(e){
        res.status(400).send("input err")
    }
})
courserouter.get("/",auth||authadmin,async (req,res)=>{
    try{const courses = await CoursesModel.find()
    res.status(200).send({courses: courses})}
    catch(err){
        res.status(500).send("failed to fetch courses")
    }
})
module.exports = courserouter