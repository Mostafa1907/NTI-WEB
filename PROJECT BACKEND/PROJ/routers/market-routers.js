const express = require("express")
const marketControllers=require ("../controllers/market-controllers")

const router = express.Router()

router 
.route("/")
.get(marketControllers.getAllProducts)
.post(marketControllers.createProduct)

router 
.route("/:id")
.get(marketControllers.getProductById)
.patch(marketControllers.updateProduct)
.delete(marketControllers.deleteProduct)

module.exports=router