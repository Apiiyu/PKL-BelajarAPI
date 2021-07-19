const express = require('express')
const router = express.Router()
const controller = require('../controller/IndexController')

router.get('/', controller.ProductController.getAllData)

module.exports = router
