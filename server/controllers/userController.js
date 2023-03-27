// import User model
const User = require('../models/userModel')

// EXPRESS VALIDATION
const { check, body, validationResult } = require('express-validator')

// GET - All Users
const getAllUsers = async (req, res, next) => {
  const users = await User.find({})
  res.status(200).json({ users })
}

// GET - single user
const getUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findById(userId).select('-password')
  res.status(200).json(user)
}

module.exports = {
  getAllUsers,
  getUser,
}
