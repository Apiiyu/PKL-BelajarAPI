const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controller/IndexController')

const storageMenu = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/menu')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const storageFood = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/foods')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const storageDrink = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/drinks')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const storageSnack = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/snacks')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploadFoods = multer({ storage: storageFood, limits: { fieldSize: 1024 * 1024 * 10 } })
const uploadDrinks = multer({ storage: storageDrink, limits: { fieldSize: 1024 * 1024 * 10 } })
const uploadSnacks = multer({ storage: storageSnack, limits: { fieldSize: 1024 * 1024 * 10 } })
const uploadMenu = multer({ storage: storageMenu, limits: { fieldSize: 1024 * 1024 * 10 } })

// <-- Router Section Menu -->
router.get('/menu', controller.ProductController.getAllDataMenu)
router.post('/create-menu', uploadMenu.single('image'), controller.ProductController.createMenu)
router.put('/update-menu', controller.ProductController.updateMenu)
router.delete('/delete-menu', controller.ProductController.deleteMenu)

// <-- Router Section Foods -->
router.get('/foods', controller.ProductController.getAllDataFood)
router.post('/create-food', uploadFoods.single('image'), controller.ProductController.createFood)
router.put('/update-food', controller.ProductController.updateFood)
router.delete('/delete-food', controller.ProductController.deleteFood)

// <-- Router Section Drinks -->
router.get('/drinks', controller.ProductController.getAllDataDrink)
router.post('/create-drink', uploadDrinks.single('image'), controller.ProductController.createDrink)
router.put('/update-drink', controller.ProductController.updateDrink)
router.delete('/delete-drink', controller.ProductController.deleteDrink)

// <-- Router Section Snacks -->
router.get('/snacks', controller.ProductController.getAllDataSnacks)
router.post('/create-snack', uploadSnacks.single('image'), controller.ProductController.createSnack)
router.put('/update-snack', controller.ProductController.updateSnack)
router.delete('/delete-snack', controller.ProductController.deleteSnack)
module.exports = router
