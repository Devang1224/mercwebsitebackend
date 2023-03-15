const express = require('express')
const router = express.Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js') 
const jwt = require('jsonwebtoken')

//register

router.post('/register',async (req,res)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    })

try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
}
catch(err){
   res.status(500).json(err.message)
}

    
})


//LOGIN

router.post("/login",async (req,res)=>{

    try{
         const user = await User.findOne({username:req.body.username })

       

        if(!user){
             res.status(401).json("User Not Found");
           return;
        }
        
    else{
        const Password = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        if(Password!=req.body.password){res.status(401).json("wrong password"); return ;}

       const accessToken = jwt.sign({
        id:user._id, 
        isAdmin:user.isAdmin,
       },process.env.JWT_SECKEY,
         {expiresIn:"3d"}
       );


        const {password, ...others} = user._doc
          res.status(200).json({...others,accessToken})
    }     


    }catch(err){

         res.status(500).json(err.message)
    }
   
})


module.exports = router;