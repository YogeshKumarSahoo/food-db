const express = require('express')
const router = express.Router()
const { registerUser, allUser, userDetails } = require('../controller/userControllers')

router.route('/').get(allUser)
router.route('/:userID').get(userDetails)
router.route('/create').post(registerUser)

module.exports = router