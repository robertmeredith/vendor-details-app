const express = require('express')
const router = express.Router()

// import middleware
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')

// import controller actions
const {
  getAllMySubmissions,
  createSubmission,
  getSingleSubmission,
  editSubmission,
  getCurrentUserSubmissions,
  deleteSubmission,
} = require('../controllers/submissionController')

// Get all submissions / create submission
router
  .route('/')
  .get(authMiddleware, getAllMySubmissions)
  .post(createSubmission)

// Get all user submissions
router.get('/showAllMySubmissions', authMiddleware, getCurrentUserSubmissions)

// Get single submission
router
  .route('/:id')
  .get(getSingleSubmission)
  .delete(deleteSubmission)
  .patch(editSubmission)

module.exports = router
