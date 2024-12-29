const jwt  = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const auth =(req,res,next) => {
    try{const token = req.headers.token;
        const decodedtoken = jwt.verify(token,JWT_SECRET);
        if (decodedtoken) {
            req.decodedtoken = decodedtoken;
            next();
        }
        else {
            res.status(403).send("not authorized,dont have token");
        }}
    catch(err){
        res.status(402).send("token error");
    }
}
const authadmin=(req,res,next) => {
    const token = req.headers.token;
    const decodedtoken = jwt.verify(token,JWT_SECRET_ADMIN);
    if (decodedtoken) {
        req.decodedtoken = decodedtoken;
        next();
    }
    else {
        res.status(403).send("only admin");
    }
}
module.exports = {
    auth:auth,
    authadmin:authadmin,
    JWT_SECRET:JWT_SECRET,
    JWT_SECRET_ADMIN:JWT_SECRET_ADMIN
}