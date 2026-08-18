const cart = require("../Data_T1/cart")


function removeFromCart(id){
    let index =  cart.findIndex((item)=>item.id===id)

    if(index !== -1){
        cart.splice=(index,1)
        console.log(`${cart[index].name} removed from cart`)
    }
    else
    {
        console.log("product not found in cart");
        
    }

}
module.exports=removeFromCart