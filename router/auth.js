const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router();
const EmpRegData = require('../model/empregmodel')
const Helpticketdata = require('../model/helpticketmodel')

const authenicate = require('../middleware/authenticate')
const addEmailInHelpticket = require('../middleware/addemailinhelpticket')






router.post('/login', async (req, res) => {

    console.log("some one try to login")

    const {email, password} = req.body

    try {

      const userData = await EmpRegData.findOne({email});

      const isMatch = await bcryptjs.compare(password,userData.password)

      if(!isMatch){
        return res.status(401).send("user is not valid")
        }

    const token = await userData.generateAuthToken(userData._id);

    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        path:'/ '
    })

    res.status(201).json(userData.name)

    } catch (error) {
        res.status(404).send(`Invalid Credentials ${error}`)
    }

})

router.post('/empregdata', async (req, res) => {

    const {name, branch, mobile, email, password, cpassword} = req.body;
    try {
        const data = await EmpRegData({name, branch, mobile, email, password, cpassword});
        await data.save()
        res.status(201).json({message: "New User Registered Successfuly"});
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/helpticket', authenicate, async (req, res) => {
    res.send(req.rootUser)
})


router.post('/helpticket', addEmailInHelpticket, async (req, res) => {
    const {yourName,branchName,departName,issueType,desc} = req.body;
    try {
        const data = await Helpticketdata({yourName,branchName,departName,issueType,desc,email});
        await data.save()
        res.status(201).json({message: "Help Ticket Succesfully Submitted"});
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/yourticket', addEmailInHelpticket, async (req, res) => {

    try {
        const userData = await Helpticketdata.find({email}).sort({"entryDate": -1});

        await res.json(userData)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('jwtoken')
        res.status(200).send("You are logouted")   

        const token = await req.cookies.jwtoken;
        

        const rootUser = await EmpRegData.findOne({"tokens.token": token});
     

        console.log(`This is token before removing cookie ${token}`)

        rootUser.tokens = rootUser.tokens.filter((currentElm) => {return currentElm.token != token})

        await rootUser.save()    
        // console.log(`Server try to clear the cookie .................`)
        // res.clearCookie('jwtoken')
        // res.status(200).send("You are logouted")    




        
        // console.log(rootUser)
        

        // console.log(`This is token after removing cookie ${token}`)
        

        // console.log(`This is token after clearing the cookie ${token}`)
 
        
        
    } catch (error) {
        console.log(`Error in logout ${error}`)        
    }
 
}
)


module.exports = router;