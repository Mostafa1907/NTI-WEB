let students= require ("../Data T2/students")

function addStudent(name,grade){
    students.push({name,grade})
    
    console.log(`${name} : added successfully `)
}
module.exports=addStudent

