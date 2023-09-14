const Booking= require("../model/bookingModel")
const jwt = require('jsonwebtoken')
const {
    checkAvailability,
     bookedTimings, 
     timeArray,
      showRemainingTime
    }=require('../utils/functions')


exports.NewBooking=async(req,res)=>{
   
    try{
    const {name,phoneNumber,date,time,hairStylist} =req.body
    const booked =await Booking.create({
        name,
        phoneNumber,
        date,
        time,
        hairStylist
    })
    const options = {
        expires:new Date(
            Date.now() + 3* 24 * 60 * 60 * 1000 
        ),
        httpOnly:true
    }
    const bookingToken = await booked.getJwtToken()
    res.status(200).cookie('bookingToken',bookingToken,options).json({
        message:'Success',
        booked,
        bookingToken
    })
}catch(err){
    res.status(500).json({
        message:'Internal Server Error'
    })
    console.error(err)
}
}
exports.allBookings=async(req,res)=>{
    try{
        const allBookings = await Booking.find()
        if(!allBookings) {
            res.status(404).json({
                message:'Not Found'
            })
            return
        }
        res.status(200).json({
            message:'Success',
            allBookings
        })
    }catch(err){
        res.status(500).json({
            message:'Internal Server Error'
        })
        console.error(err);
    }
}
exports.remainingTime=async(req,res)=>{
    try{
        const {bookingToken} = req.cookies
        
    if(!bookingToken){
        res.status(401).json({
            message:"You Dont havce a booking token"
        })
        return
    }
    try{
    const decoded =await jwt.verify(bookingToken,process.env.JWT_SECRET)
    var booking=await Booking.findById(decoded.id)
    }catch(err){
        res.status(401).json({
            message:"Sorry Some Error Occured Your Booking Token Must Have Expired"
        })
        return
    }
    const date = booking.date
    const time =booking.time
    const phoneNumber = booking.phoneNumber
    const remainingTimeString=showRemainingTime(date,time,phoneNumber)
    res.status(200).json({
        message:'success',
        remainingTimeString
    })

    }catch(err){
        res.status(500).json({
            message:'Internal Server Error'
        })
        console.error(err)
    }
}
exports.availableTimes=async(req,res,next)=>{
try{
    const { date, hairStylist } = req.body
    const allBookings = await Booking.find({ $and: [{ date }, { hairStylist }] })
    const allBookedTimings = bookedTimings(allBookings)
    const availableTimes = checkAvailability(timeArray, allBookedTimings)
    console.log(availableTimes);
    res.status(200).json({
        message:"success",
        availableTimes
    })
}catch(err){
    console.log(err);
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}
exports.scheduleChange=async(req,res,next)=>{
    try{
        const {id1 , id2} = req.body
        const canceledSchedule = await Booking.findById(id1)
        const scheduleToBeChanged = await Booking.findById(id2)
        if(!canceledSchedule||!scheduleToBeChanged){
            res.status(500).json({
                message:"User Not Found"
            })
            return
        }
        scheduleToBeChanged.time=canceledSchedule.time
        scheduleToBeChanged.date=canceledSchedule.date
        await scheduleToBeChanged.save({validateBeforeSave:false})
        await Booking.findByIdAndDelete(canceledSchedule.id)
        res.status(200).json({
            message:"sucess",
            scheduleToBeChanged
        })



    }catch(err){
        res.status(500).json({
            message:"Some Internal Server Error"
        })
        console.log(err);
    }
}
exports.deleteBookings=async(req,res)=>{
    try{
    const {id} =req.params
    const deletedSchedule = await Booking.findByIdAndDelete(id)
    res.status(200).json({
        message:"Schedule Deleted"
    })

}catch(err){
    console.log(err);
    res.stats(500).json({
        message:"Internal Server Error"
    })
}
}

exports.showSpecificSchedules=async(req,res)=>{
    try{
    const {hairStylist,date} = req.body
    const specificSchedules = await Booking.find({$and:[{hairStylist},{date}]})
    if(!specificSchedules){
        res.status(404).json({
            message:"Sorry!..There are no Schedules for You"
        })
        return
    }
    res.status(200).json({
        message:"Success",
        specificSchedules


    })
}catch(arr){
    console.log(err);
    res.stats(500).json({
        message:"Internal Server Error"
    })
}

}
exports.cancelBooking=async(req,res,next)=>{
    try{
    const {bookingToken} = req.cookies
    console.log(bookingToken);
    if(!bookingToken){
        res.status(401).json({
            message:"You Dont havce a booking token"
        })
        return
    }
    const decoded =await jwt.verify(bookingToken,process.env.JWT_SECRET)
    const canceledBooking=await Booking.findByIdAndDelete(decoded.id)
    if(!canceledBooking){
        res.status(404).json({
            message:"Booking Not Found"
        })
        return
    }
    res.status(200).cookie("bookingToken",null,{
        expires:new Date(
            Date.now() 
        ),
        httpOnly:true
    }).json({
        message:"Your Schedule Has Been Cancelled Successfully",
        canceledBooking
    })
    }catch(err){
        res.status(500).json({
            message:"Some Internal Server Error"
        })
        console.log(err);
    }

}