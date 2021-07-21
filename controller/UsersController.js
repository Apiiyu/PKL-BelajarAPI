const Model = require('../config/model/Index')
const express = require('express')
const cookieParser = require('cookie-parser')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const controller = {}
// const authTokens = {}
const app = express()

app.use(cookieParser())

controller.login = async (req, res) => {
  try {
    await Model.Users.findAll({ where: { email: req.body.email, password: md5(req.body.password) } })
      .then((result) => {
        if (result.length > 0) {
          res.cookie('authcookie', jwt.sign({ user: req.body.email }, 'users'))
          res.send('Cookie Added')
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
