function calculateShipping(weight)
{
    return new Promise((resolve, reject) => {
        
        if (weight>=1)
        {
            let shoppingCost= weight * 5
            resolve(`Shopping Cost : ${shoppingCost}`)
        }
        else
        {
            reject("Invalid weight")
        }    
    })
}

calculateShipping(2)
.then((test)=>{ console.log(test)})
.catch((error)=>{error})


calculateShipping(-22)
.then((test)=>{ console.log(test)})
.catch((error)=>{console.log(error);
})