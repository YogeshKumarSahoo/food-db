const express = require('express')
const router = express.Router()
const { registerUser } = require('../controller/userControllers')

router.route('/create').post(registerUser)

module.exports = router