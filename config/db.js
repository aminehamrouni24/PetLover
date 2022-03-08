const mongoose = require('mongoose')
require('dotenv').config()


const MONGO_URI = process.env.MONGO_URI
// initializing the db:
const db=()=>{
    mongoose.connect(MONGO_URI)
    .then(()=>console.log('DATABASE CONNECTED SUCCESSFULLY'))
    .catch(err=>console.log(err))
}

module.exports = db