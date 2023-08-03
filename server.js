// env constants
require('dotenv').config()
const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

const connectDB = require('./server/db.js')

// Initialise express
const express = require('express')
const app = express()
// Enables default handling of async errors without try catch - can just throw
require('express-async-errors')

// FOR DEPLOYMENT to Heroku
const { dirname } = require('path')
const path = require('path')

// FOR DEPLOYMENT - security
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

// FOR DEPLOYMENT - rate limit
const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again in 15 minutes',
})

// Import Routes
const authRouter = require('./server/routes/authRouter.js')
const userRouter = require('./server/routes/userRouter.js')
const submissionRouter = require('./server/routes/submissionRouter.js')
const vendorRouter = require('./server/routes/vendorRouter.js')
const userSettingsRouter = require('./server/routes/userSettingsRouter.js')

// Import Middleware
const morgan = require('morgan')
const errorHandlerMiddleware = require('./server/middleware/errorHandlerMiddleware.js')
const notFoundMiddleware = require('./server/middleware/notFoundMiddleware.js')

// MIDDLEWARE
app.use(morgan('tiny'))
// Parse JSON bodies
app.use(express.json())

// DEPLOYMENT  - security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        'data:',
        'https://images.unsplash.com',
        'https://tailwindui.com',
      ],
    },
  })
)
app.use(xss())
app.use(mongoSanitize())

// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'))
// }

// DEPLOYMENT
const __dirName = dirname(require.main.filename)
// DEPLOYMENT - location of build file
app.use(express.static(path.resolve(__dirName, 'client/build')))

app.get('/api/v1', (req, res) => {
  res.status(205).json({ msg: 'Welcome' })
})

app.use('/api/v1/auth', apiLimiter, authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/submissions', submissionRouter)
app.use('/api/v1/vendors', vendorRouter)
app.use('/api/v1/settings', userSettingsRouter)

// DEPLOYMENT - after trying above routes, serve index.html file

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirName, 'client/build', 'index.html'))
})
// app.use(express.static('client/build'))

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Function to connect to database, then if successful spin up server
const start = async () => {
  try {
    await connectDB(MONGO_URI)
    console.log('Database is connected')
    app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

start()
