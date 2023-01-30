require('dotenv').config()
require("../db/conn")
const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser')
const cors = require('cors');
const PORT = process.env.PORT || 7000
const app = express()


const allowedOrigins = ['http://internalmern.netlify.app'];

app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));


app.use(cookieParser())
app.use(express.json())
app.use(require("../router/auth"))







app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})

