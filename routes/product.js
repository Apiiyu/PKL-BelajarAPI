const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('../controller/IndexController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router.get('/foods', controller.ProductController.getAllData)
router.post('/create-food', upload.single('image'), controller.ProductController.createFood)

module.exports = router
