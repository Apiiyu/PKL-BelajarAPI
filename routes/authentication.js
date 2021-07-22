const express = require('express')
const router = express.Router()
const controller = require('../controller/IndexController')

router.get('/get-data', controller.UsersController.getAllData)
router.post('/login', controller.UsersController.login)
router.post('/register', controller.UsersController.register)
router.put('/update', controller.UsersController.updateData)
router.delete('/delete', controller.UsersController.deleteData)

module.exports = router
