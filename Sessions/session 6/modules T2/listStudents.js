let students= require ("../Data T2/students")

function listStudents(){

    students.forEach((x)=>console.log(`name : ${x.name}  grade : ${x.grade}`))
}
module.exports=listStudents
