const express =require('express')
const { NewBooking, allBookings,availableTimes, changeSchedule, cancelSchedule, showSpecificSchedules, findDateAndTime } = require('../controller/bookingController')
const { authenticateUser, authorizeUser } = require('../middlewares/authenticateUser')
const router = express.Router()

router.route('/new').post(authenticateUser,NewBooking)
router.route('/time').get(authenticateUser,findDateAndTime)
router.route('/availabletimes').get(availableTimes)
router.route('/cancel/schedule').get(cancelSchedule)

router.route('/admin/allbookings').get(authenticateUser,authorizeUser('admin'),allBookings)
router.route('/admin/specific/schedules').post(authenticateUser,authorizeUser('admin'),showSpecificSchedules)
router.route('/admin/schedule/change/:id1/:id2').patch(authenticateUser,authorizeUser('admin'),changeSchedule)
router.route('/admin/schedule/delete/:id').delete(authenticateUser,authorizeUser('admin'),changeSchedule)

module.exports = router