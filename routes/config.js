const { Unauthorized } = require('http-errors')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).send('Unauthorized')
  }

  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
  const user = auth[0]
  const pass = auth[1]

  if (user && pass) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
