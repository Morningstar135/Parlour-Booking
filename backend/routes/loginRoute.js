const express = require('express')
const { 
    userRegister,
    userLogin,
    userLogout,
    resetPassword,
    forgotPassword,
    makeAdmin 
    } = require('../controller/authcontroller')
const { authenticateUser } = require('../middlewares/authenticateUser')
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

module.exports = router


