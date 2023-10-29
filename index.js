const express = require('express')
const { connect } = require('./db')
const { userRouter } = require('./Routes/user.route')
const { todoRouter } = require('./Routes/todo.route')
const app = express()
require('dotenv').config()

app.use(express.json())

app.use("/users", userRouter)
app.use("/todos", todoRouter)

app.listen(process.env.PORT, async()=>{
    try {
        await connect
        console.log("server is running ")
    } catch (err) {
        console.log(err.message)        
    }
})