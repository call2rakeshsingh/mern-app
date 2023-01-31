const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
require('dotenv').config()

const empRegDataSchema = mongoose.Schema({
    name:{
        type:String,
        minlenght:3,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        unique : true,
        min: 4000000000,
        max: 10000000000,
        required: true
    },
    email:{
        type: String,
        unique : true,
        required: true,
        validate(value){
            validator.isEmail(value)
        }
    },
    password:{
        type: String,
        required: true,   
        minLength: 4  
    },
    cpassword:{
        type: String,
        required: true,
        minLength: 4  
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

empRegDataSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10)
        this.cpassword = await bcryptjs.hash(this.cpassword, 10)
    }
    next()
})


// we are generating token

empRegDataSchema.methods.generateAuthToken = async function (_id){
    try {
        const token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token; 
        
    } catch (error) {
        console.log(error)
    }
}


const EmpRegData = mongoose.model("EmpRegData", empRegDataSchema);

module.exports = EmpRegData;