const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const apiDocumentation = require('./config/api/api-docs')
const authentication = require('./config/lib/auth')
const authTokens = {}
const app = express()

// Basic Set-up
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(helmet.frameguard())
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.disable('x-powered-by')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

// Api Documentation
const options = {
  customCss: '.swagger-ui .topbar {display: none}'
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocumentation, options), authentication)

// <-- Stripe Payment Gateway -->
const publishKey = 'pk_test_51JL1JaLNXpkOIJz68xqKw4e5rmDTXH8HFUJP7OJqFpsPYIsk3bzY74Kbccq7xiLWxHvct9LPDE0CziIAeeG5gxb400eaDJ4zoh'
const secretKey = 'sk_test_51JL1JaLNXpkOIJz6Tqbt6ooiFuwY3wN6AYb996pKv9jscCkxXrAZ8oQWMUFsJBTyYcb9xa6SC3krlnc1KoaOLtpQ00zwd0kf8i'
const stripePayment = require('stripe')(secretKey)

app.get('/', (req, res) => {
  res.redirect('/api-docs')
})

app.get('/ui-payment', (req, res) => {
  res.render('payment', { key: publishKey })
})

app.post('/payment', (req, res) => {
  stripePayment.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Rafi Khoirulloh',
    address: {
      line1: 'Jl. Babakan Jati',
      postal_code: '40275',
      city: 'Bandung',
      state: 'Jawa Barat',
      country: 'Indonesia'
    }
  })
    .then((customer) => {
      return stripePayment.charges.create({
        amount: 25000, // Charing Rs 25
        description: 'Web Development Product',
        currency: 'INR',
        customer: customer.id
      })
    })
    .then((charge) => {
      res.status(200).json({
        status: 200,
        message: 'Payment Successfully',
        data: charge
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.use('/authentication', require('./routes/authentication'))
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies.AuthToken

  // Inject the user to the request
  req.user = authTokens[authToken]

  next()
})

app.use('/users', authentication, require('./routes/users'))
app.use('/api-product', authentication, require('./routes/product'))
app.use('/protected', require('./routes/protected'))
// Error Handling
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: '404 Not Found'
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on http://localhost:3000')
})
