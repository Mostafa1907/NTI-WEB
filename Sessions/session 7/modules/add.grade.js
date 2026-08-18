const saveGrades = require ("./save.grades.js") 
const readGrades=require("./read.grades.js")

function addGrade(id,name,subject,grade){

    let grades = readGrades()

    grades.push({
        id,
        name,
        subject,
        grade
    })
saveGrades(grades)
console.log("student added");

}
module.exports=addGrade
