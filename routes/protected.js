const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const checkToken = (req, res, next) => {
  const authcookie = req.cookies.authcookie

  jwt.verify(authcookie, 'users', (err, data) => {
    if (err) {
      res.redirect('/authentication/login')
    } else if (data.user) {
      req.user = data.user
      next()
    }
  })
}

router.get('/', checkToken, (req, res) => {
  res.json({
    message: 'Successfully'
  })
})

module.exports = router
