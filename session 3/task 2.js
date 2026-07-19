//------------1------------
console.log("Hello")
setTimeout(function () {
console.log("World")
}, 2000)


//------------2------------
function printNums(){
    for (let i=1;i<=5;i++) {
    setTimeout(function () {
        console.log(i)
    },i*1000)
}}
printNums()


//------------3------------
console.log("loading");
setTimeout(function(){
console.log("done")
}, 3000)


//------------4------------
function sendMessage(){
    console.log("Sending Message")
    setTimeout(function (){
    console.log("Message Sent Success")
    }, 2000)
}
sendMessage()