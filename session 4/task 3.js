function sendVerificationEmail(email){
    return new Promise((resolve)=> {
        console.log("Sending verification email...");
        setTimeout(() => {
            resolve("Email sent successfully")
        }, 2000);
    })
}

async function  registerUser(name, email) {
  try
    {
        if (!name || !email) {
            throw new Error("name and email required")
        }
    let status = await sendVerificationEmail(email)
    console.log(status);
    console.log("User registered successfully");

}
  catch (error){
        console.log(error.message)   
  }
}  
registerUser("mostafa","mos@gmail.com")
    