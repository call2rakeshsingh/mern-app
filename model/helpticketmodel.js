const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const helpticketdataSchema = mongoose.Schema({
    yourName:{
        type:String,
        minlenght:3,
        required: true
    },
    
    branchName:{
        type:String,
        minlenght:3,
        required: true
    },
    departName:{
        type:String,
        minlenght:2,
        required: true
    },
    issueType:{
        type:String,
        minlenght:3,
        required: true
    },
    desc: {
        type:String,
        minlenght:3,
        required: true
    },
    email:{ 
            type:String,
            minlenght:3,
            required: true
        },
        entryDate:{
            type: Date,
            default: Date()
        }
})

// helpticketdataSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcryptjs.hash(this.password, 10)
//         this.cpassword = await bcryptjs.hash(this.cpassword, 10)
//     }
//     next()
// })


// we are generating token


const Helpticketdata = mongoose.model("Helpticketdata", helpticketdataSchema);

module.exports = Helpticketdata;