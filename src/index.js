import app from "./app.js"
import  connectdb  from "./db/index.js"
let PORT = process.env.PORT||8000


connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.warn(`Server is listening on port: ${PORT}`)
    })
}
).catch((err)=>console.warn(err))