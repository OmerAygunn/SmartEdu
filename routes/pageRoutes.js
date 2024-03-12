const express = require('express')
const pageControllers = require('../controllers/pageControllers')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

const router = express.Router()

router.route('/').get(pageControllers.getIndexPage)
router.route('/about').get(pageControllers.getAboutPage)
router.route('/contact').get(pageControllers.getContactPage)
router.route('/register').get(redirectMiddleware,pageControllers.getRegisterPage)
router.route('/login').get(redirectMiddleware,pageControllers.getLoginPage)

module.exports = router