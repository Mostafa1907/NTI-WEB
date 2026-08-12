const fs = require("fs");
const Course = require("../models/course-models");
const deleteUploadedFile = require("../utils/delete-uploaded-file")

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
 
    res.status(200).json({
      status: "success",
      count: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch courses: ${error.message}`,
    });
  }
};
 
const createCourse = async (req, res) => {
  try {
    const category = req.body.category
    const level = req.body.level
    

    const newCourse = await Course.create({
      ...req.body,
      category,
      level,
      imageUrl:req.file?.filename
    });
 
    res.status(201).json({
      status: "success",
      message: "New course added",
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    if(req.file){
      deleteUploadedFile("courses",req.file.filename)
    }
    res.status(400).json({
      status: "error",
      message: `Failed to create course: ${error.message}`,
    });
  }
};
 
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
 
    if (!course) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }
 
    res.status(200).json({
      status: "success",
      data: { course },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create course: ${error.message}`,
    });
  }
};
 
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(
      req.params.id
    )
   
    if (!course) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }

     if (req.body.category){ req.body.category = req.body.category.toLowerCase()}
    if (req.body.level){ req.body.level = req.body.level.toLowerCase()}
 
    if(req.file){
      req.body.imageUrl=req.file.filename
      if(course.imageUrl){
        deleteUploadedFile("courses",course.imageUrl)
      }
    }

    Object.assign(course,req.body)
    const updatedCourse= await course.save()
 
    res.status(200).json({
      status: "success",
      message: "Course updated",
      data: {
        course: updatedCourse,
      },
    });
  } catch (error) {
    if(req.file){
      deleteUploadedFile("courses",req.file.filename)
    }
}
}
 
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
 
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }
    if (deletedCourse.imageUrl){
      deleteUploadedFile("courses",deletedCourse.imageUrl)
    }
 
    res.status(200).json({
      status: "success",
      message: "Course deleted",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete course: ${error.message}`,
    });
  }
};
 
module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
}