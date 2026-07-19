//------------1------------
console.log("Start");
console.log("Middle");
console.log("End");


//------------2------------
function secStep() {
    console.log("Second Function")
}
function fStep() {
    console.log("First function")
    secStep()
    console.log("Back to first function")
}
fStep()


//------------3------------
let num1 = 30
let num2 = 5

let sum = num1 + num2
console.log("sum : ", sum)
let sub = num1 - num2
console.log("sub : ", sub)
let mult = num1 * num2
console.log("mult : ", mul)
let div = num1 / num2
console.log("div : ", div)

//------------4------------
function add(a, b){
    return a + b
}
function printResult(result){
    console.log("result : ", result)
}
let answer = add(10, 15)
printResult(answer)