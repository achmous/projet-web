
var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var prisma = new PrismaClient()

//Login endPoint

router.post('/login', async (req, res) => {


    const { login, password } = req.body

    console.log(req.body);
    //validate email

    const user = await prisma.user.findUnique(

        {
            where: {
                email: login,
            }
        }

    )
   //user not founded 
    if (!user)
        res.status(400).send("Invalid email");

    //validate password 

    const validPassword = await bcrypt.compare(password,user.password);

    if (!validPassword)
    res.status(400).send("Invalid password");


    //user entrries correct 

    try {

        //generate JWT Token
        const authToken = jwt.sign({id : user.id},process.env.JWT_KEY)
        //send user token
        res.header("authToken",authToken).send(authToken);
        

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

module.exports = router;


