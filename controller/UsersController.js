const Model = require('../config/model/Index')
const express = require('express')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const md5 = require('md5')
const controller = {}
const app = express()

app.use(cookieParser())

const generateToken = () => {
  return crypto.randomBytes(30).toString('hex')
}

controller.login = async (req, res) => {
  try {
    await Model.Users.findAll({ where: { email: req.body.email, password: md5(req.body.password) } })
      .then((result) => {
        if (result.length > 0) {
          const authToken = generateToken()
          const cookie = res.cookie('AuthToken', authToken)
          console.log(cookie)
        } else {
          res.render('login')
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.register = async (req, res) => {
  try {
    await Model.Users.create({
      nama: req.body.nama,
      email: req.body.email,
      password: md5(req.body.password)
    })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully create new account!'
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

module.exports = controller
