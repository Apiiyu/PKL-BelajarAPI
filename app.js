const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const session = require('express-session')
const apiDocumentation = require('./config/api/api-docs')
const authTokens = {}
const app = express()

// Basic Set-up
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// app.use(fileUpload())
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

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'develop'
  // store: new SequelizeStore({ db: Database, table: 'Session', extendDefaultFields })
}))

// Api Documentation
const options = {
  customCss: '.swagger-ui .topbar {display: none}'
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocumentation, options))

app.get('/', (req, res) => {
  res.json({
    message: 'testing'
  })
})

app.use('/api-product', require('./routes/product'))
app.use('/authentication', require('./routes/authentication'))
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies.AuthToken

  // Inject the user to the request
  req.user = authTokens[authToken]

  next()
})

app.use('/protected', require('./routes/protected'))
// Error Handling
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: '404 Not Found'
  })
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})
