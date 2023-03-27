const express = require('express')
const router = express.Router()

// import Auth Middleware
const authMiddleware = require('../middleware/authMiddleware')

// import User model
const Vendor = require('../models/vendorModel')

// import controller actions
const {
  getAllVendors,
  getSingleVendor,
  getCurrentUserVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendorController')

// GET ALL VENDORS - CREATE VENDOR
router.route('/').get(getAllVendors).post(authMiddleware, createVendor)

// GET - all user vendors
router.get('/showAllMyVendors', authMiddleware, getCurrentUserVendors)

// GET SINGLE VENDOR
router.get('/:vendorId', getSingleVendor)

// UODATE SINGLE VENDOR
router.put('/:id', authMiddleware, updateVendor)

// DELETE SINGLE VENDOR
router.delete('/:id', deleteVendor)

module.exports = router
