const express = require('express')
const jwt = require('jsonwebtoken')
const Booking = require('../model/bookingModel')
const {
    NewBooking,
    allBookings,
    availableTimes,
    showSpecificSchedules,
    deleteBookings,
    scheduleChange,
    cancelBooking,
    getHairStylistArray,
    addHairStylistInArray,
    remainingTime,
    getBooking
} = require('../controller/bookingController')
const {
    authenticateUser,
    authorizeUser
} = require('../middlewares/authenticateUser')
const router = express.Router()

router.route('/new/:token').post(
    authenticateUser,
    NewBooking
)
router.route('/new').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/availabletimes').post(
    availableTimes
)
router.route('/cancel/schedule/:token').get(
    authenticateUser,
    cancelBooking
)
router.route('/cancel/schedule').get(
    authenticateUser,
    remainingTime
)
router.route('/new').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/show/remaining/time/:token').get(
    authenticateUser,
    remainingTime
)
router.route('/show/remaining/time').get(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route ('/get/booking/:token').get(authenticateUser,getBooking)
router.route('/get/hairstylists').get(getHairStylistArray)

//Admin Routes
router.route('/admin/add/hairStylists/:token').post(authenticateUser,authorizeUser("admin"),addHairStylistInArray)
router.route('/admin/add/hairStylists').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/admin/allbookings/:token').get(
    authenticateUser,
    authorizeUser('admin'),
    allBookings
)
router.route('/admin/allbookings').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/admin/specific/schedules/:token').post(
    authenticateUser,
    authorizeUser('admin'),
    showSpecificSchedules
)
router.route('/admin/specific/schedules').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/admin/schedule/change/:token').post(
    authenticateUser,
    authorizeUser('admin'),
    scheduleChange
)
router.route('/admin/schedule/change').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)
router.route('/admin/schedule/delete/:token').post(
    authenticateUser,
    authorizeUser('admin'),
    deleteBookings
)
router.route('/admin/schedule/delete/').post(
    (req,res)=>{
        res.status(400).json({
            message:"Login First To Handle This Resource"
        })
    }
)

module.exports = router