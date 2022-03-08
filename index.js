// importing dependencies
const express = require('express')
const db = require('./config/db')
const auth = require('./middlewares/auth')
require('dotenv').config()

// initializing express
const app = express()
// middlewares
app.use(express.json())
app.use('/api/users' , require('./routes/authRoutes'))
app.use('/api/posts' , require('./routes/postRoutes'))
app.use("/api/pets", require("./routes/petRoutes"));

// global environment settings
const PORT = process.env.PORT

// Database configuration
db()

// server on listen for requests
app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT :${PORT}`)
})















