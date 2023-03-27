const express = require('express')
const router = express.Router()


// import Validation
const authValidation = require('./validation/authValidation')

const { register, login } = require('../controllers/authController')

// POST - Register
router.post('/register', authValidation.register, register)

// POST - Login
router.post('/login', authValidation.login, login)

module.exports = router
