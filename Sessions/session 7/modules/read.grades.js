const fs = require("fs")


function readGrades(){
    let data = fs.readFileSync("./data/grades.json","utf-8")
    return JSON.parse(data)
}

module.exports=readGrades