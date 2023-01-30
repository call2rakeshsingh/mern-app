require('dotenv').config()
require("../db/conn")
const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser')
const cors = require('cors');
const PORT = process.env.PORT || 7000
const app = express()

app.use(cors({
    origin: "http://internalmern.netlify.app",
    credentials: true,
}));


app.use(cookieParser())
app.use(express.json())
app.use(require("../router/auth"))

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})

