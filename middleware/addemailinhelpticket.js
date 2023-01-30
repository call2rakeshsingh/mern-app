const jwt = require('jsonwebtoken')
const Helpticketdata = require('../model/helpticketmodel')
const EmpRegData = require('../model/empregmodel')
const express = require('express')
const app = express()
require('dotenv').config()



const addEmailInHelpticket = async (req, res, next) => {
    console.log(req.cookies.jwtoken)
    // await console.log(`Error in authenicate`) 
    try {

        const token = await req.cookies.jwtoken;
        
        // console.log(token)
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken)


        const rootUser = await EmpRegData.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){
            throw new Error("Due to invalid token user can not register")
        }
        console.log(`rootUser ${rootUser.name}`)
        req.token = token;
        email = rootUser.email;
        names = rootUser.name;
        req.userId = rootUser._id

        next();
        
    } catch (error) {
        res.status(404).send("Unautherised")
        console.log(`Error in authenicate middleware ${error}`) 
    }


}


module.exports = addEmailInHelpticket;