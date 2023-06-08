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
    const validToken = isTokenValid(authorization.split(' ')[1])
    const user = await User.findById(validToken.userId).select('-password')
    console.log('/authMiddleware', user);
    if (!user) {
      throw new CustomError.NotFound('Authentication Invalid')
    }
    req.user = user
  } catch (error) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  next()
}

module.exports = authMiddleware
