const express = require('express')
const router = express.Router()

// import User model
const User = require('../models/userModel')

const { getUser, getAllUsers } = require('../controllers/userController')

// GET - all users
router.get('/', getAllUsers)

// GET - single user
router.get('/:id', getUser)



module.exports = router
