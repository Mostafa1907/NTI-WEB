function getProduct(id) {
    
let products={ 
1:"phone",
2:"pc",
3:"laptop"
}
return new Promise((resolve, reject) => {
    
if(products[id])
    {
    resolve(products[id])
    }
else
    {
    reject("product not found")
    }    
})
}
setTimeout(() => {
    getProduct(2)
    .then((found) => console.log(found))
    .catch((error)=>console.log("ntfound") )
}, 1000);

setTimeout(() => {
    getProduct(4)
    .then((found) => console.log(found))
    .catch((error)=>console.log("ntfound") )
}, 3000);