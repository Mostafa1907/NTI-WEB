//------------1------------
function greet(name, callback){
    console.log("Hello "+ name)
    callback()
}

function last(){
    console.log("Welcome")
}
greet("Mostafa", last)


//------------2------------
function calc(num1, num2, op){
    let result = op(num1, num2)
    console.log(result)
}

function add(a,b){
    return a + b
}

function sub(a,b){
    return a - b
}

function mul(a,b){
    return a * b
}
calc(10, 5, add)
calc(10, 5, sub)
calc(10, 5, mul)


//------------3------------
function loadData(callback){
    console.log("Loading data")
    setTimeout(function (){
        console.log("Data loaded")
        callback()
    }, 3000)
}
function showData(){
    console.log("Displaying data")
}
loadData(showData)


//------------4------------
function login(callback){
    console.log("Logging in")
    setTimeout(function (){
        console.log("Login Successful")
        callback()
    }, 2000)
}

function dashboard(){
    console.log("Welcome To Dashboard")
}
login(dashboard)