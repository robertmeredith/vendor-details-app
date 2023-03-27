const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const CustomError = require('../errors')

// import User model
const Submission = require('../models/submissionModel')

// GET ALL SUBMISSIONS
const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find({}).populate({
    path: 'vendors',
    populate: [
      {
        path: 'vendorID',
        model: 'Vendor',
      },
    ],
  })
  res.status(200).json({ submissions })
}

// CREATE SUBMISSION
const createSubmission = async (req, res) => {
  const { user, client, vendors } = req.body

  // Save vendor details if not already in database
  const updatedVendors = vendors.map((vendor) => {
    return
  })

  const newSubmission = new Submission({ user, client, vendors })
  await newSubmission.save()

  res.status(200).json({ newSubmission })
}

// GET SINGLE SUBMISSION
const getSingleSubmission = async (req, res) => {
  const { id: submissionId } = req.params

  const submission = await Submission.findById(submissionId)

  if (!submission) {
    throw new CustomError.NotFound(
      `No user submission found with id ${submissionId}`
    )
  }

  res.status(StatusCodes.OK).json({ submission })
}

// DELETE SUBMISSION
const deleteSubmission = async (req, res) => {
  const { id: submissionId } = req.params

  const submission = await Submission.findById(submissionId)
  if (!submission) {
    throw new CustomError.NotFound(`No record found with id ${submissionId}`)
  }
  await submission.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Form submission removed' })
}

// GET CURRENT USER SUBMISSIONS
const getCurrentUserSubmissions = async (req, res) => {
  res.send('getCurrentUserSubmissions')
}

module.exports = {
  getAllSubmissions,
  createSubmission,
  getSingleSubmission,
  getCurrentUserSubmissions,
}
