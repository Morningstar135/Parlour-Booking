const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

exports.authenticateUser=async(req,res,next)=>{
    try{
        var {token}= req.params
    if(!token){
        res.status(401).json({
            message:'Login to handle this resource'
        })    
        return
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)   
    req.user=await User.findById(decoded.id)
    console.log(req.user)
    if(!req.user){
        res.status(401).json({
            message:'User Not Found'
        })
        return
    }
    next()
}catch(err){
    res.status(400).json({
        message:"Some Internal Server Error"
    })
    console.error(err);
}
}

exports.authorizeUser=(...roles)=>{
    try{
    return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        res.status(401).json({
            message:'Only Admin can view this site'
        })
        return
    }
    next()
    }
    }catch(err){
        res.status(400).json({
            message:"Some Internal Server Error"
        })
        console.error(err);
        return
    }
    next()
}
