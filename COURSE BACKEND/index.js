const path = require("path")
const dns = require("dns")
const multer= require("multer")
const authRouter = require("./routers/auth-routes");
const userRouter = require ("./routers/user-routes");

dns.setServers(["8.8.8.8","8.8.4.4"])
require("dotenv").config()

const express = require("express")
const courserouters = require ("./routers/course-routers")
const dbConnect=require ("./config/db-connect")

const app = express()
dbConnect()

app.use(express.json())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/courses",courserouters)
app.use("/api/v1/uploads",express.static(path.join(__dirname,"uploads")))



app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);

})