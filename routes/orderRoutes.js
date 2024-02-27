const express = require('express')
const router = express.Router()
const { createOrder, allOrder, createInvoice } = require('../controller/orderControllers')

router.route('/').get(allOrder)
router.route('/create').post(createOrder)
router.route('/generate-invoice').get(createInvoice)

module.exports = router