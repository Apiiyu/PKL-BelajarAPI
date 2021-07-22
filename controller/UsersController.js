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
          res.status(200).json({
            status: 200,
            message: 'Successfully login into your account and added cookie'
          })
        } else {
          res.status(400).json({
            status: 400,
            message: 'Invalid Email or password!'
          })
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

controller.getAllData = async (req, res) => {
  try {
    await Model.Users.findAll()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully get all data users',
            data: result
          })
        } else {
          res.status(200).json({
            status: 200,
            message: 'Successfully get data but data not available in database',
            data: []
          })
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.updateData = async (req, res) => {
  try {
    await Model.Users.update({ nama: req.body.nama, email: req.body.email, password: req.body.password },
      { where: { email: req.body.lastEmail } })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully update data users!'
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Error update data users!'
    })
  }
}

controller.deleteData = async (req, res) => {
  try {
    await Model.Users.destroy({ where: { email: req.body.email, password: md5(req.body.password) } })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully delete account!'
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Error delete data account!'
    })
  }
}

module.exports = controller
