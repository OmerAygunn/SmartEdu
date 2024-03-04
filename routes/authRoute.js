const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authController.dashboardPage)


module.exports = router