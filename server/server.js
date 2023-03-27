// env constants
require('dotenv').config()
const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

const connectDB = require('./db.js')

// Initialise express
const express = require('express')
const app = express()

// Import Routes
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const submissionRouter = require('./routes/submissionRouter')
const vendorRouter = require('./routes/vendorRouter')

// Import Middleware
const morgan = require('morgan')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const notFoundMiddleware = require('./middleware/notFoundMiddleware')

// MIDDLEWARE
app.use(morgan('tiny'))
// Parse JSON bodies
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/submissions', submissionRouter)
app.use('/api/v1/vendors', vendorRouter)

app.use('/', (req, res) => {
  res.send('Hello World')
})
app.use(notFoundMiddleware)

app.use(errorHandlerMiddleware)

// Function to connect to database, then if successful spin up server
const start = async () => {
  try {
    await connectDB(MONGO_URI)
    console.log('Database is connected')
    app.listen(5001, () => console.log(`Server is listening on PORT ${PORT}`))
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

start()
