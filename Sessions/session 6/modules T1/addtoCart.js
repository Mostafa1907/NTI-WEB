let cart=require("../Data_T1/cart")
let products = require("../Data_T1/products")


function addCart(id){

    let product=products.find((item)=>item.id===id)

    if(product)
    {
        cart.push(product)
        console.log(`${product.name} added to cart `)
    }else
    {
        console.log("product not found")
    }
}
module.exports=addCart