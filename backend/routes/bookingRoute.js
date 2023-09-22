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
    remainingTime
} = require('../controller/bookingController')
const {
    authenticateUser,
    authorizeUser
} = require('../middlewares/authenticateUser')
const { showRemainingTime } = require('../utils/functions')
const router = express.Router()

router.route('/new/:token').post(
    authenticateUser,
    NewBooking
)
router.route('/availabletimes').post(
    availableTimes
)
router.route('/cancel/schedule/:token').get(
    authenticateUser,
    cancelBooking
)
router.route('/show/remaining/time/:token').get(
    authenticateUser,
    remainingTime
)
router.route('/get/hairstylists').get(getHairStylistArray)

//Admin Routes
router.route('/admin/add/hairStylists/:token').post(authenticateUser,authorizeUser("admin"),addHairStylistInArray)

router.route('/admin/allbookings/:token').get(
    authenticateUser,
    authorizeUser('admin'),
    allBookings
)
router.route('/admin/specific/schedules/:token').post(
    authenticateUser,
    authorizeUser('admin'),
    showSpecificSchedules
)
router.route('/admin/schedule/change/:token').post(
    authenticateUser,
    authorizeUser('admin'),
    scheduleChange
)
router.route('/admin/schedule/delete/:token').delete(
    authenticateUser,
    authorizeUser('admin'),
    deleteBookings
)

module.exports = router