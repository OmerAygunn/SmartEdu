const express = require('express')
const authController = require('../controllers/authController')
const authmiddlewares = require('../middlewares/authMiddlewaers')
const { body } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage("Please enter your name"),
        body('password').not().isEmpty().withMessage("Please enter your password"),
        body('email').isEmail().withMessage("Please enter your Email correctly")
        .custom(async (userEmail) =>{
          const user =   await User.findOne({email:userEmail})
          if(user){
            throw new Error('Email already exists');
          }
        })
    ],
    authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authmiddlewares,authController.dashboardPage)
router.route('/delete/:id').delete(authController.deleteUser)


module.exports = router