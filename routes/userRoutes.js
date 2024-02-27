const express = require('express')
const router = express.Router()
const { registerUser, allUser, userDetails, recommendations } = require('../controller/userControllers')

router.route('/').get(allUser)
router.route('/:userID').get(userDetails)
router.route('/recommendation/:userID').get(recommendations)
router.route('/create').post(registerUser)

module.exports = router