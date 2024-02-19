const express = require('express')
const router = express.Router()
const { createResto, allResto, allRestoFood } = require('../controller/restoControllers')

router.route('/').get(allResto)
router.route('/:food').get(allRestoFood)
router.route('/create').post(createResto)

module.exports = router