const path = require("path")
const dns = require("dns")
const multer= require("multer")

dns.setServers(["8.8.8.8","8.8.4.4"])

require("dotenv").config()
const express = require("express")
const marketrouters = require ("./routers/market-routers")
const dbConnect=require ("./config/db-connect")


const app = express()
app.use(express.json())
dbConnect()

app.use("/api/v1/products",marketrouters)
app.use("/api/v1/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(5000, () => {
    console.log(`Connected to MongoDB`);

})