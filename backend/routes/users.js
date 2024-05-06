const express = require ("express")
const userRouter = express.Router()

const {register, registerServiceProvider , login } =  require ("../controllers/users")

userRouter.post("/register" , register)
userRouter.post("/ServiceProvider" , registerServiceProvider)
userRouter.post("/login" , login)


module.exports = userRouter