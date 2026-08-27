const express = require("express")
const marketControllers=require ("../controllers/market-controllers")
const authorizeMiddleware = require ("../middlewares/authorize-middleware")
const authenticateMiddleware =require("../middlewares/authenticate-middleware")
const upload= require("../middlewares/multer-middleware")


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