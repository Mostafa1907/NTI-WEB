const dns = require("dns")

dns.setServers(["8.8.8.8","8.8.4.4"])

require("dotenv").config()
const express = require("express")
const courserouters = require ("./routers/course-routers")
const dbConnect=require ("./config/db-connect")


const app = express()
app.use(express.json())
dbConnect()
app.use("/api/v1/courses",courserouters)

app.listen(5000, () => {
    console.log(`server running on port ${process.env.PORT}`);

})