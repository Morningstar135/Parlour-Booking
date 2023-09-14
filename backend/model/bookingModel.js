const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

let bookingSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:15,
    },
    phoneNumber:{
        type:String,
        required:true,
        maxlength:10,
    },
    hairStylist:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true 
    },
    isBooked:{
        type:Boolean,
        default:true
    }
})
bookingSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_TIME2
     })
 }
const bookingModel=mongoose.model('bookings',bookingSchema)

module.exports=bookingModel