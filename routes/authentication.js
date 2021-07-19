const express = require('express')
const router = express.Router()
const controller = require('../controller/IndexController')

router.post('/login', controller.UsersController.login)
router.post('/register', controller.UsersController.register)

module.exports = router
