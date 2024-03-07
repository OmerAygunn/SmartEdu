const express = require('express')
const courseController = require('../controllers/courseController')
const roleMiddlewares = require('../middlewares/roleMiddlewaers')
const router = express.Router()

router.route('/').post(roleMiddlewares(["teacher","admin"]),courseController.createCourses)
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/enroll').post(courseController.enrollCourse)
router.route('/relase').post(courseController.relaseCourse)

module.exports = router
