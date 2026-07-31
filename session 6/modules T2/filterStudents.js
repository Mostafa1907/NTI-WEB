let students = require("../Data T2/students")
const calcAvg = require("./calcAvg")


function filterPassed(){
   
    students.forEach((student)=> {
        let avg =calcAvg(student.grade)

    if(avg>=60)
    {
        console.log(`student name :${student.name }  AVG : ${avg}`)
    }

    })
}
module.exports=filterPassed
