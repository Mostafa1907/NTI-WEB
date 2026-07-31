let cart = require("../Data_T1/cart")

function listCart(){
    console.log(`cart items : ${cart.length}`)

    cart.forEach((item) => console.log(`Id : ${item.id} Name: ${item.name} Price :${item.price}`))
}   
module.exports=listCart

