const express = require("express")
const marketControllers=require ("../controllers/market-controllers")
const multer = require ("multer")
const fs = require("fs")
const upload= require("../middleWares/multer-middleware")


const router = express.Router()    

router 
.route("/")
.get(marketControllers.getAllProducts)
.post(upload.single("imageUrl"),marketControllers.createProduct)

router 
.route("/:id")
.get(marketControllers.getProductById)
.patch(upload.single("imageUrl"),marketControllers.updateProduct)
.delete(marketControllers.deleteProduct)

module.exports=router