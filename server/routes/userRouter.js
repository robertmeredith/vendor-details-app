const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')

const {
  getUser,
  getAllUsers,
  getUserSettings,
  getUserVendors,
} = require('../controllers/userController')

// GET - all users
router.get('/', getAllUsers)

// GET - single user
router.get('/:id', authMiddleware, getUser)

// GET - user settings
router.get('/:id/settings', getUserSettings)

// GET - user vendors
router.get('/:id/vendors', getUserVendors)

module.exports = router
