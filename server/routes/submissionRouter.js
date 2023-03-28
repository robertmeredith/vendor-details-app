const express = require('express')
const router = express.Router()

// import record model
const Submission = require('../models/submissionModel')

// import middleware
const authMiddleware = require('../middleware/authMiddleware')

// import controller actions
const {
  getAllSubmissions,
  createSubmission,
  getSingleSubmission,
  editSubmission,
  getCurrentUserSubmissions,
  deleteSubmission,
} = require('../controllers/submissionController')

// Get all submissions / create submission
router.route('/').get(getAllSubmissions).post(createSubmission)

// Get all user submissions
router.get('/showAllMySubmissions', authMiddleware, getCurrentUserSubmissions)

// Get single submission
router
  .route('/:id')
  .get(getSingleSubmission)
  .delete(deleteSubmission)
  .patch(editSubmission)

module.exports = router
