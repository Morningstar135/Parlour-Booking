const Booking= require("../model/bookingModel")
const jwt = require('jsonwebtoken')
const {checkAvailability, bookedTimings, formatDate, generateTimeSlots}=require('../utils/functions')
const { sendMessage } = require("../utils/sendMessage")


exports.NewBooking=async(req,res)=>{
   
    try{
    const {name,phoneNumber,date,time,hairStylist} =req.body
    const dateAndTime = dateString(time,date)
    console.log(dateAndTime);
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
exports.findDateAndTime=async(req,res)=>{
    try{
        const {bookingToken} = req.cookies
    if(!bookingToken){
        res.status(401).json({
            message:"You Dont havce a booking token"
        })
        return
    }
    const decoded =await jwt.verify(bookingToken,process.env.JWT_SECRET)
    const booking=await Booking.findById(decoded.id)
    const dateAndTime = booking.dateAndTime
    res.status(200).json({
        message:'success',
        dateAndTime
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
    const {date,hairStylist} =req.body
    const array=formatDate(date)
    const [year,month,day] =array
    const timings=generateTimeSlots(year,month,day)
  const allBookings =await Booking.find({$and:[{date},{hairStylist}]})
  const allBookedTimings =bookedTimings(allBookings)
  const availableTimes = checkAvailability(timings,allBookedTimings)
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

exports.changeSchedule=async(res,req,next)=>{
    try{
    const {id1,id2} = req.params
    const canceledSchedule =await Booking.findById(id1)
    const scheduleToBeChanged = await Booking.findById(id2)
    if(! canceledSchedule||scheduleToBeChanged){
        res.status(404).json({
            message:"Schedule Not Found"
        })
    }
    scheduleToBeChanged.dateAndTime=canceledSchedule.dateAndTime
    scheduleToBeChanged.date=canceledSchedule.date
    await scheduleToBeChanged.save({validateBeforeSave:false})
    console.log(scheduleToBeChanged);
    res.status(200).json({
        message:"success",
        scheduleToBeChanged
    })
    
}catch(err){
    console.log(err);
    res.status(500).json({
        message:"Internal Server Error"
    })
}

}
exports.deleteBookings=async(req,res)=>{
    try{
    const {_id} =req.params
    const deletedSchedule = await Booking.findByIdAndDelete(_id)
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

exports.cancelSchedule=async(res,req)=>{
    try{
        const {bookingToken} = req.cookies
    if(!bookingToken){
        res.status(401).json({
            message:"You Dont havce a booking token"
        })
        return
    }
    const decoded =await jwt.verify(bookingToken,process.env.JWT_SECRET)
    const canceledBooking=await Booking.findByIdAndDelete(decoded.id)
    res.status(200).json({
        message:"Your Schedule Has Been Cancelled Successfully",
        canceledBooking
    })
}catch(err){
    console.log(err);
    res.stats(500).json({
        message:"Internal Server Error"
    })
}
}

exports.reminder=async()=>{
    const time = new Date()
    const todayBookings =await Booking.find({date})
    todayBookings.map((booking)=>{
        var options ={
            phoneNumber:booking.phoneNumber,
            message:"Your Appointment is in 10 Minutes.Get Ready to go.Please Make Sure you are on time "
        }

       var expTime=new Date(booking.dateAndTime) 
       var bookingTime = expTime.setMinutes(date.getMinutes() - 10);
       if(time==bookingTime) {
        sendMessage(options)
       }
    })
}