const path = require("path")
const dns = require("dns")
const authRouter = require("./routers/auth-routes")
const userRouter = require ("./routers/user-routes")
const express = require("express")
const marketrouters = require ("./routers/market-routers")
const dbConnect=require ("./config/db-connect")
const cors=require("cors")
const orderRouter=require("./routers/order-routes")

dns.setServers(["8.8.8.8","8.8.4.4"])

require("dotenv").config()



const app = express()

dbConnect()

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json())
app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products",marketrouters)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/uploads",express.static(path.join(__dirname,"uploads")))
app.listen(5000, () => {
    console.log(`Connected to MongoDB`);

})