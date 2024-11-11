import express from "express"
import cors from "cors"
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser"
import { test } from "./middlewares/testing.js"
import { errorHandling } from "./middlewares/globleErrorHandling.js"
import { AppError } from "./utils/AppError.js"

const app = express()
app.use(cors(
    {origin:process.env.CORS_ORIGIN}
))

app.use(express.json({limit:"16kb", extended: true }))
app.use(express.urlencoded({limit:'16kb',extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
// app.use(test)
app.use("/user/:id",userRouter)
app.all("*", (req, _, next) => {
    next(new AppError(`Path ${req.originalUrl} does not exist for ${req.method} method`, 404));
  });
  
app.use(errorHandling)

export default app