const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const ObjectId= mongoose.Schema.ObjectId;

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
})
const CoursesSchema = new Schema({
    CourseName:String,
    CourseContent:String,
})
const Admin=new Schema({
    AdminName:String,
    email:String,
    password:String,
})
const Purchases=new Schema({
    userId:ObjectId,
    CourseName:String,
})
UserModel = mongoose.model("/users", UserSchema)
CoursesModel= mongoose.model("/courses",CoursesSchema)
AdminModel= mongoose.model("/admin",Admin)
PurchasesModel= mongoose.model("/purchases",Purchases)
module.exports = {
    UserModel: UserModel,
    CoursesModel: CoursesModel,
    AdminModel: AdminModel,
    PurchasesModel: PurchasesModel,
}