const Booking= require("../model/bookingModel")
const {
    checkAvailability,
     bookedTimings, 
     timeArray,
      showRemainingTime,
      getHairStylists,
      addHairStylists
    }=require('../utils/functions')


exports.NewBooking=async(req,res)=>{
   
    try{
    const {name,phoneNumber,date,time,hairStylist} =req.body
    const obj = req.user
    const user =obj.id
    const pin = Math.floor(100000 + Math.random() * 900000);
    const booked =await Booking.create({
        name,
        phoneNumber,
        date,
        time,
        hairStylist,
        pin,
        user
    })
    res.status(200).json({
        message:'Success',
        booked
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
exports.remainingTime =async(req,res)=>{
    try{
        const obj = req.user
        const user =obj.id
    if(!user){
        res.status(401).json({
            message:"You Dont havce a booking token"
        })
        return
    }
    const booking=await Booking.findOne({user})
    if(! booking){
        res.status(404).json({
            message:"Oops! This Booking Doesn't Exist"
        })
        return
    }
    const date = booking.date
    const time =booking.time
    const phoneNumber = booking.phoneNumber
    const pin =booking.pin
    const remainingTimeString=showRemainingTime(date,time,phoneNumber,user) 
    res.status(200).json({
        message:'success',
        remainingTimeString,
        pin
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
    const allBookings = await Booking.find({date,hairStylist})
    const allBookedTimings = bookedTimings(allBookings)
    const availableTimes = checkAvailability(timeArray, allBookedTimings)
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
    const specificSchedules = await Booking.find({hairStylist,date})
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
        const user =req.user.id
    if(!user){
        res.status(401).json({
            message:"You Dont havce a Schedule to cancel"
        })
        return
    }   
    const canceledBooking=await Booking.findOneAndDelete({user})
    if(!canceledBooking){
        res.status(404).json({
            message:"Booking Not Found"
        })
        return
    }
    res.status(200).json({
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
exports.getHairStylistArray=(req,res)=>{
    const hairStylists=getHairStylists()
    res.status(200).json({
        message:`success`,
        hairStylists
    })
}
exports.addHairStylistInArray=(req,res)=>{
    const {name}=req.body
    const hairStylists=addHairStylists(name)
    res.status(200).json({
        message:`success`,
        hairStylists
    })
}