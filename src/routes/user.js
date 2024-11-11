import express from "express"
const userRouter = express.Router({ mergeParams: true })

userRouter.get('/', (req, res) => {
    res.send(req.params)
  }).get('/about', (req, res) => {
    res.json({m:req.params,msg:"ok"})
  })
  
  export default userRouter