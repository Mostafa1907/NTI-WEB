const fs= require("fs")
const path = require ("path")
const http = require ("http")

const filePath = path.join(__dirname , "Books.json")

const server = http.createServer(
    (req ,res )=>{
        const url = req.url
        const method=req.method

        res.setHeader("Content-Type","application/json")

        if (method=="GET" && url ==="/Books")
        {
            fs.readFile(filePath,"utf-8", (err,data)=>{
                if(err){
                    res.writeHead(500)
                    return res.end(JSON.stringify({message : "Error reading file"}))
                }
                res.writeHead(200)
                res.end(data)
            })
        }

        else if(method=="POST" && url ==="/Books")
        {
            let body = ""

            req.on("data",(chunk)=>{
                body+=chunk
            })

            req.on("end",()=>{

                let book

                try{
                    book= JSON.parse(body)

                }catch{
                    res.writeHead(400)
                    return res.end(JSON.stringify({message : "invalid JSON"}))
                }

                if(!book.title ||!book.author ||book.price == undefined ||book.available == undefined){
                    res.writeHead(400)
                    return res.end(JSON.stringify({message:"Missing Fields"}))
                }

                fs.readFile(filePath,"utf-8",(err,data)=>{

                    if(err){
                        res.writeHead(500)
                        return res.end(JSON.stringify({message : "Error reading file"}))
                    }

                    const Books=JSON.parse(data)

                   let lastbook = Books[Books.length - 1]

                    if (Books.length == 0) {
                        book.id = 1
                    } else {
                        book.id = lastbook.id + 1
                    }

                    Books.push(book)
                    fs.writeFile(filePath,JSON.stringify(Books,null,2), (err)=>{

                        if(err){
                            res.writeHead(500)
                            return res.end(JSON.stringify({message : "Error writing file"}))
                        }

                        res.writeHead(201)
                        res.end(JSON.stringify(book))

                    })

                })

            })
        }

       
    })

server.listen(5000,()=>{
    console.log("server is running")
})