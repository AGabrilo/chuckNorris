const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const { AuthService } = require('../services')

module.exports = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const userNow = await AuthService.getUserById(decoded.id)

  if (!userNow) {
    return next(new AppError('The user that this token belongs to does no longer exist ', 401))
  }

  req.userId = decoded.id
  next()
})
