const express = require('express')
const router = express.Router()

// import record model
const Submission = require('../models/submissionModel')

// import controller actions
const {
  getAllSubmissions,
  createSubmission,
  getSingleSubmission,
  getCurrentUserSubmissions,
} = require('../controllers/submissionController')

// Get all submissions
router.get('/', getAllSubmissions)

// Get single submission
router.get('/:id', getSingleSubmission)

// Create new submission
router.post('/', createSubmission)

// Get all user submissions
router.get('/showAllMySubmissions', getCurrentUserSubmissions)

module.exports = router
