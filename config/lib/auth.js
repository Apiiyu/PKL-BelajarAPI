const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authcookie = req.cookies.authcookie

  jwt.verify(authcookie, 'users', (err, data) => {
    if (err) {
      res.status(401).json({
        message: 'Unauthorized'
      })
    } else if (data.user) {
      req.user = data.user
      next()
    }
  })
}
