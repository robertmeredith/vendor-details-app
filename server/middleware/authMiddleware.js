const CustomError = require('../errors')
const { isTokenValid } = require('../utils/jwt')
const User = require('../models/userModel')

// AUTH MIDDLEWARE - takes token from auth header
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers
  console.log('AUTH MIDDLEWARE', authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  try {
    const validToken = isTokenValid(authorization.split(' ')[1])
    const user = await User.findById(validToken.userId).select('-password')
    console.log('/authMiddleware', user)
    if (!user) {
      throw new CustomError.NotFound('Authentication Invalid')
    }
    req.user = user
  } catch (error) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  next()
}

const adminMiddleware = async (req, res, next) => {
  console.log('-----ADMIN AUTH----')
  const { user } = req
  console.log('USER', user)

  if (!user || user.role !== 'admin') {
    throw new CustomError.Unauthenticated(
      'Admin privileges required to access this route'
    )
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }
