
function calcAvg(grade){
    let sum = 0

    grade.forEach((x)=> sum += x)
    return sum / grade.length 
}
module.exports=calcAvg
