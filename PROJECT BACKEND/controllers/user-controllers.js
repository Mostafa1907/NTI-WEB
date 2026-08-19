const User =require("../models/user-models")

const Product = require("../models/market-models")


const addProductToUser=async(req,res)=>{
    try{
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).json({status:"fail",message:"User Not Found"})
        }
        
        const {productId}=req.body
        const  product = await Product.findById(productId)
       
        if(!product){
            return res.status(404).json({status:"fail",message:"product Not Found"})
        }

        const alreadyAdded=user.myProducts.some((id)=>id.toString() === productId)
        if(alreadyAdded){
            return res.status(400).json({
                status:"fail",
                message:"Product already added"
            })
        }

        user.myProducts.push(productId)
        product.customers +=1
        await product.save()
        await user.save()

        res.status(200).json({
            status:"success",
            message:"Product added successfully to ur Cart",
            data :{
                myProducts:user.myProducts
            }
        })



    }catch(err){
        res.status(400).json({
            status:"error",
            message:`Error in adding product : ${err.message}`
        })
    }
}

const getUserProducts=async(req,res)=>{
    try{
 const user = await User.findById(req.userId).populate("myProducts");          if(!user){
            return res.status(404).json({status:"fail",message:"User Not Found"})
        }
        res.status(200).json({
            status:"success",
            message:"product added successfully to ur Cart",
            data :{
                myProducts:user.myProducts
            }
        })


    }catch(err){    
    res.status(400).json({
        status:"error",
        message:`error in fetching your products ${err.message}`
    })
}}


module.exports={addProductToUser,getUserProducts}