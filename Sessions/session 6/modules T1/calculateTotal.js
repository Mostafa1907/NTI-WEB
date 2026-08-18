let cart=require("../Data_T1/cart")

function CalcTotal(){
    let total=0
    cart.forEach(item=> total += item.price)

    console.log(`Total price : ${total}`)
}
module.exports=CalcTotal