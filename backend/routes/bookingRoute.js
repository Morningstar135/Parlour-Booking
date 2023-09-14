const express =require('express')
const { NewBooking, allBookings,availableTimes, changeSchedule, cancelSchedule, showSpecificSchedules, remainingTime } = require('../controller/bookingController')
const { authenticateUser, authorizeUser } = require('../middlewares/authenticateUser')
const router = express.Router()

router.route('/new').post(authenticateUser,NewBooking)
router.route('/availabletimes').post(availableTimes)
router.route('/cancel/schedule').get(authenticateUser,cancelSchedule)
router.route('/show/remaining/time').get(authenticateUser,remainingTime)

router.route('/admin/allbookings').get(authenticateUser,authorizeUser('admin'),allBookings)
router.route('/admin/specific/schedules').post(authenticateUser,authorizeUser('admin'),showSpecificSchedules)
router.route('/admin/schedule/change').post(authenticateUser,authorizeUser('admin'),changeSchedule)
router.route('/admin/schedule/delete/:id').delete(authenticateUser,authorizeUser('admin'),changeSchedule)

module.exports = router