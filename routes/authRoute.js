const express = require('express')
const authController = require('../controllers/authController')
const authmiddlewares = require('../middlewares/authMiddlewaers')

const router = express.Router()

router.route('/signup').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authmiddlewares,authController.dashboardPage)


module.exports = router