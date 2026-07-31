const fs = require("fs")
const express = require ("express")

let courses =JSON.parse(fs.readFileSync("./data/courses-data.json","utf-8"))


const app = express()
app.use(express.json())

app.get("/api/v1/courses",(req,res)=>{
    res.status(200).json({
    status:"success",
    count:courses.length,
    data : {
        courses
    }

})
})

app.post("/api/v1/courses",(req,res)=>
   {
    const newId= courses[courses.length-1].id+1

    const newCourse={
        id : newId,
        ...req.body
    }

    courses.push(newCourse)

    fs.writeFile("./data/courses-data.json",JSON.stringify(courses,null,2),(err)=>{
        if (err){
            return res.status(500).json({message:"error saving file"})
        }
        res.status(201).json({
            status:"success",
            message:"new course added",
            data:{
                courses:newCourse
            }
        })



    })

})


app.listen(5000,()=>{
    console.log("server running on port 5000");
    
})