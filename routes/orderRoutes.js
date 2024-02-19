const express = require('express')
const router = express.Router()
const { createOrder, allOrder } = require('../controller/orderControllers')

router.route('/').get(allOrder)
router.route('/create').post(createOrder)

module.exports = router