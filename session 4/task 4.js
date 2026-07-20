async function getUserProfile(id)
 {
    let response =await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    let User = await response.json()
    console.log(`name : ${User.name}`)
    console.log(`email : ${User.email}`)
}               
getUserProfile(1)
getUserProfile(5)