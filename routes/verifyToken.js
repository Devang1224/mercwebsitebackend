const express = require('express')
const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];     
        jwt.verify(token,process.env.JWT_SECKEY,(err,user)=>{
            if(err){
                res.status(403).json("token is Invalid");
            }
            else{
                req.user=user;
                next();
            }
        })
    }
    else{
        return res.status(401).json("you are not authenticated!!");
    }
}

// here 'next' is a callback argument for middleware function
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin)
       {
           next()
       } else{
        res.status(403).json("not allowed!")
       }

    })
}


const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)
       {
           next()
       } else{
        res.status(403).json("not allowed!")
       }

    })
}





module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}
