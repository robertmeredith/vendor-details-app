const User = require('../models/userModel')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { createJWT } = require('../utils/jwt')

// REGISTER
const register = async (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide username, email and password')
  }

  // check if user exists
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // make first registered user an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = new User({
    name,
    email,
    password,
    role,
  })
  await user.save()

  const token = createJWT({ userId: user._id, name: user.name })

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  })
}

// LOGIN
const login = async (req, res, next) => {
  console.log('HITTING LOGIN CONTROLLER')
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.Unauthenticated('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated('Invalid Credentials')
  }

  const token = createJWT({ userId: user._id, name: user.name })

  res.status(StatusCodes.OK).json({
    details: {
      name: user.name,
      id: user.id,
    },
    token,
  })
}

module.exports = {
  register,
  login,
}
