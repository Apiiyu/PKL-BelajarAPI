const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controller/IndexController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 10 } })

router.get('/foods', controller.ProductController.getAllDataFood)
router.post('/create-food', upload.single('image'), controller.ProductController.createFood)
router.put('/update-food', controller.ProductController.updateFood)
router.delete('/delete-food', controller.ProductController.deleteFood)

module.exports = router
