const CustomError = require('../errors')
const { isTokenValid } = require('../utils/jwt')
const User = require('../models/userModel')

// AUTH MIDDLEWARE - takes token from auth header
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  try {
    // if not valid token, throws error
    const validToken = isTokenValid(authorization.split(' ')[1])
    const user = await User.findById(validToken.userId).select('-password')

    if (!user) {
      throw new CustomError.NotFound('Authentication Invalid')
    }
    req.user = user
    return next()
  } catch (error) {
    throw new CustomError.Unauthenticated('Token expired. Please login again')
  }
}

const adminMiddleware = async (req, res, next) => {
  const { user } = req

  if (!user || user.role !== 'admin') {
    throw new CustomError.Unauthenticated(
      'Admin privileges required to access this route'
    )
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }
