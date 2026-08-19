const User =require("../models/user-models")
const Course =require("../models/course-models")


const addCourseToUser=async(req,res)=>{
    try{
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).json({status:"fail",message:"User Not Found"})
        }
        
        const {courseId}=req.body
        const  course = await Course.findById(courseId)
       
        if(!course){
            return res.status(404).json({status:"fail",message:"Course Not Found"})
        }

        const alreadyEnrolled=user.myCourses.some((id)=>id.toString() === courseId)
        if(alreadyEnrolled){
            return res.status(400).json({
                status:"fail",
                message:"Course already added"
            })
        }

        user.myCourses.push(courseId)
        course.students +=1
        await course.save()
        await user.save()

        res.status(200).json({
            status:"success",
            message:"course added successfully to ur courses",
            data :{
                myCourses:user.myCourses
            }
        })



    }catch(err){
        res.status(400).json({
            status:"error",
            message:`Error in adding course : ${err.message}`
        })
    }
}

const getUserCourses=async(req,res)=>{
    try{
 const user = await User.findById(req.userId).populate("myCourses");          if(!user){
            return res.status(404).json({status:"fail",message:"User Not Found"})
        }
        res.status(200).json({
            status:"success",
            message:"course added successfully to ur courses",
            data :{
                myCourses:user.myCourses
            }
        })


    }catch(err){    
    res.status(400).json({
        status:"error",
        message:`error in fetching your coutrses ${err.message}`
    })
}}


module.exports={addCourseToUser,getUserCourses}