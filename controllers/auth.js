const { AuthService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { toUserObject } = require('../utils/paramsConversion')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

module.exports.createUser = catchAsync(async (req, res, next) => {
  const userObject = toUserObject(req)

  const newUser = await AuthService.createUser(userObject)

  const token = signToken(newUser._id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
})

module.exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('You need to provide email and password!', 400))
  }

  const user = await AuthService.loginUser(email)

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401))
  }

  const token = signToken(user._id)

  res.status(201).json({
    status: 'success',
    token,
    data: { user }
  })
})
