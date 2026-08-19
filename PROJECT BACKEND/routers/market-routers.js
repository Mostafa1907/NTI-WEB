const express = require("express")
const marketControllers=require ("../controllers/market-controllers")
const multer = require ("multer")
const fs = require("fs")
const authorizeMiddleware = require ("../middleWares/authorize-middleware")
const authenticateMiddleware =require("../middleWares/authenticate-middleware")
const upload= require("../middleWares/multer-middleware")


const router = express.Router()    

router 
.route("/")
.get(marketControllers.getAllProducts)
.post(authenticateMiddleware,authorizeMiddleware("admin"),upload.single("imageUrl"),marketControllers.createProduct)

router 
.route("/:id")
.get(marketControllers.getProductById)
.patch(authenticateMiddleware,authorizeMiddleware("admin"),upload.single("imageUrl"),marketControllers.updateProduct)
.delete(authenticateMiddleware,authorizeMiddleware("admin"),marketControllers.deleteProduct)

module.exports=router