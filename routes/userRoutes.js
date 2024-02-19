const express = require('express')
const router = express.Router()
const { registerUser, allUser } = require('../controller/userControllers')

router.route('/').get(allUser)
router.route('/create').post(registerUser)

module.exports = router