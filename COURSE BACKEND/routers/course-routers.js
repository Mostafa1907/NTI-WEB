const express = require("express")
const courseControllers = require ("../controllers/courses-controllers")
const multer = require ("multer")
const fs = require("fs")
const authorizeMiddleware = require ("../middleWares/authorize-middleware")
const authenticateMiddleware =require("../middleWares/authenticate-middleware")
const upload= require("../middleWares/multer-middleware")



const router = express.Router()

router 
.route("/")
.get(courseControllers.getAllCourses)
.post(authenticateMiddleware,authorizeMiddleware("admin"),upload.single("imageUrl"),courseControllers.createCourse)

router 
.route("/:id")
.get(courseControllers.getCourseById)
.patch(authenticateMiddleware,authorizeMiddleware("admin"),upload.single("imageUrl"),courseControllers.updateCourse)
.delete(courseControllers.deleteCourse)

module.exports=router