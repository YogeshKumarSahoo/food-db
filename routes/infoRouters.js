const express = require('express')
const router = express.Router()
const { justinfo, initial } = require('../controller/infoControllers')

router.route('/').get(initial)
router.route('/info').get(justinfo)

module.exports = router