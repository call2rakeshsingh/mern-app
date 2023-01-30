require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser')



require("../db/conn")



// dotenv.config({path: "../config.env"})
const PORT = process.env.PORT || 7000
const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(require("../router/auth"))




app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})

