const express = require('express')
const { 
    userRegister,
    userLogin,
    userLogout,
    resetPassword,
    forgotPassword,
    makeAdmin 
    } = require('../controller/authcontroller')
const { authenticateUser, authorizeUser } = require('../middlewares/authenticateUser')
const { createDetails, updateDetails, getDetails } = require('../controller/detailsController')
const router= express.Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/logout').get(
    authenticateUser,
    userLogout
    )
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:resettoken').get(resetPassword)
router.route('/register/:pass').post(
    authenticateUser,
    makeAdmin
    )
router.route('/create/details/:token').post(authenticateUser,authorizeUser('admin'),createDetails)
router.route('/update/details/:token').patch(authenticateUser,authorizeUser('admin'),updateDetails)
router.route('/get/details/:token').get(authenticateUser,authorizeUser('admin'),getDetails)
module.exports = router


