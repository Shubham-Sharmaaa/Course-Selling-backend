const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const adminrouter   = require("./routes/admin");
const userRouter = require("./routes/user");
const courserouter = require("./routes/courses");
require("dotenv").config();

app.use('/user',userRouter);
app.use("/courses",courserouter);
app.use("/admin",adminrouter);
async function  main()
{
    mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
}
main();