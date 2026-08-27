const mongoose = require ("mongoose")

const dbConnect= async () =>{
    try{
   await mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.DB_NAME})
    console.log(`Database connected successfully`);
    
    }catch(error){
        console.log(`Database connention error : ${error.message}`);
    }
        
}
module.exports = dbConnect
    
