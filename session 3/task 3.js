//------------1------------
console.log("Start")
setTimeout(function (){
    console.log("task")
    }, 2000)
console.log("end")


//------------2------------
console.log("A");
setTimeout(function (){
    console.log("B")
    }, 0)
console.log("C")


//------------3------------
console.log("Step 1")
setTimeout(function (){
    console.log("Step 2")
    }, 1000)

console.log("Step 3")
console.log("Step 4")


//------------4------------
console.log("Program Start")
setTimeout(function () {
    console.log("Async Task")
}, 0)

console.log("line 1")
console.log("line 2")
console.log("program end") 