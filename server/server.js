const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())



//routes
app.use('/api', require('./server/routes/authRoute') )


mongoose.connect(process.env.DB_URL,{
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log(`Connected to MongoDB`)
})




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )

