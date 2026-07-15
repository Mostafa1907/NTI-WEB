let customerName =prompt("Enter ur name")
let Product_Category=prompt("Enter Product Category (Clothes - Food - Electrecity )")
let product_Price=Number(prompt("Enter Product Price"))
let quant=Number(prompt("Enter Product Quantity"))
let couponCode=prompt("Enter Coupon")
let paymentMethod=prompt("Enter Payment Method (Cash - Visa - Instapay)")
let subtotal = product_Price * quant
let catdiscount=0
let paydiscount=0
let coupondisc=0

if(Product_Category === "Food")
    {
        catdiscount=subtotal * 0.02
    }
    else if(Product_Category === "Clothes") 
    {
      catdiscount=subtotal * 0.05

    }
    else if(Product_Category==="Electrecity") 
    {
       catdiscount=subtotal * 0.10
    }
    else
    {
       catdiscount=0
    }

if(paymentMethod==="Visa")
    {
        paydiscount=subtotal* 0.05
    }
    else if(paymentMethod==="Cash")
    {
        paydiscount = 0
    }
    else if (paymentMethod==="Instapay")
    {
        paydiscount=subtotal*0.04
    }
    else
    {
       paydiscount=0
    }


if(couponCode=="Mos10")
    { 
        coupondisc=subtotal*0.10
    }   
    else
    {
        coupondisc=0
    }

let totaldisc = catdiscount + paydiscount + coupondisc
let afterdisc = subtotal - totaldisc
let vat = afterdisc * 0.14  
let finaltotal = vat + afterdisc
console.log("cutomer name :" + customerName )
console.log("Product Category : " + Product_Category)
console.log("product Price : " + product_Price)
console.log("Product Quantity : " + quant)
console.log("payment Method : " + paymentMethod)
console.log("Total Price : " + subtotal)
console.log("Coubon Discount :" + coupondisc )
console.log("VAT :" + vat)
console.log("Total After discount : " )
console.log("Total invoice : "+ finaltotal)

alert("\nProduct Category : " +  Product_Category 
    + "\nproduct Price : " + product_Price +
     "\nProduct Quantity : " + quant + 
    "\npayment Method : " + paymentMethod +
    "\nTotal Price : " + subtotal+
    "\nVAT : " + vat+
     "Total invoice : "+ finaltotal)



