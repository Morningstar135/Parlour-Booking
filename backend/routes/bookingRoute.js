const express = require('express')
const {
    NewBooking,
    allBookings,
    availableTimes,
    showSpecificSchedules,
    remainingTime,
    deleteBookings,
    scheduleChange,
    cancelBooking
} = require('../controller/bookingController')
const {
    authenticateUser,
    authorizeUser
} = require('../middlewares/authenticateUser')
const router = express.Router()

router.route('/new').post(
    authenticateUser,
    NewBooking
)
router.route('/availabletimes').post(
    availableTimes
)
router.route('/cancel/schedule').get(
    authenticateUser,
    cancelBooking
)
router.route('/show/remaining/time').get(
    authenticateUser,
    remainingTime
)



router.route('/admin/allbookings').get(
    authenticateUser,
    authorizeUser('admin'),
    allBookings
)
router.route('/admin/specific/schedules').post(
    authenticateUser,
    authorizeUser('admin'),
    showSpecificSchedules
)
router.route('/admin/schedule/change').post(
    authenticateUser,
    authorizeUser('admin'),
    scheduleChange
)
router.route('/admin/schedule/delete/:_id').delete(
    authenticateUser,
    authorizeUser('admin'),
    deleteBookings
)

module.exports = router