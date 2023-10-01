const User=require('../model/userModel')
const { sendMessage } = require('../utils/sendMessage')


const options = {
    expires:new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 
    ),
    httpOnly:true
}
exports.userRegister = async(req,res)=>{
    try{
    let {name,phoneNumber,password} = req.body
    const existedUser =await User.findOne({phoneNumber})
    if(existedUser){
        res.status(400).json({
            message:"This Number Already Exists Try Logging In  to your Account"
        })
        return
    }
    const registeredUser = await User.create({
        name,
        phoneNumber,
        password
    }) 
    const token =await registeredUser.getJwtToken()
    res.status(200).cookie('token',token,options).json({
        message:'Success',
        registeredUser,
        token
    })
}catch(err){
    res.status(500).json({
        message:"Some Internal Server Error"
    })
    return
}
}

exports.userLogin=async(req,res)=>{
    try{
    const {phoneNumber,password}=req.body
    if(!phoneNumber||!password){
        res.status(401).json({
            message:"Enter PhoneNumber and Password"
        })
        return
    }
    const user = await User.findOne({phoneNumber}).select("+password")
    if(!user){
        res.status(401).json({
            message:'Invalid PhoneNumber or Password'
        })
        return
    }
    if(!await user.isValidPassword(password)){
       res.json({
        message:'Invalid PhoneNumber or password'
       }) 
       return
    }
    const token = user.getJwtToken()
    res.status(200).cookie('token',token,options).json({
        user,
        token,
        message:"Success"
    })
}catch(err){
    res.status(500).json({
        message:"Internal Server Error"
    });
}

}
exports.userLogout=async(req,res)=>{
    try{
    const logout={
        expires:new Date(Date.now()),
        httpOnly:true
    }
    res.status(200).cookie('token',null,logout).json({
        message:"Successfully loggedOut"
    })
}catch(err){
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}
exports.forgotPassword = async (req, res, next)=>{
    try{
    const user =  await User.findOne({phoneNumber: req.body.phoneNumber});

    if(!user) {
        res.status(404).json({
            message:"User Not Found"
        })
        return
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})
    
    const resetUrl = `http://localhost:3000/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this, then ignore it.`;
    sendMessage({
        phoneNumber:user.phoneNumber,
        message
    })

    }catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }  
}
exports.resetPassword = async (req, res, next) => {
    try{
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.resettoken).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        res.status(400).json({
            message:"User Not Found"
        })
        return
    }

    if( req.body.password !== req.body.confirmPassword) {
        res.status(400).json({
            message:"Password Doesnot Match"
        })
        return
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    const token =await user.getJwtToken()
    res.status(200).cookie('token',token,options).json({
        user,
        token,
        message:"Success"
    })
}catch(err){
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}
exports.makeAdmin=async(req,res)=>{
    try{
    const {pass} = req.params
    if(pass==process.env.ADMIN_PASS){
    const user = req.user
    const id = user._id
    const changeRole =await User.findById(id)
    if(changeRole.role==='admin'){
        res.status(401).json({
            message:'You are Already an Admin',
        })
        return
    }
    
    res.status(200).json({
        message:'success',
        admin
    })
    return
}
    res.status(401).json({
        message:"You Don't have a Authorised Pass"
    })

}catch(err){
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}