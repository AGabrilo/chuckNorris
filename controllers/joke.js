const { JokeService, AuthService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const sendEmail = require('../utils/emailUtil')

module.exports.getJoke = catchAsync(async (req, res, next) => {
  const { userId } = req

  const user = await AuthService.getUserById(userId)

  if (!user) return next(new AppError('User not found', 404))

  const result = await JokeService.getJoke()

  if (!result) return next(new AppError('Joke not found', 404))

  await sendEmail({
    email: user.email,
    subject: 'Chuck Norris joke',
    message: result.value
  })

  res.status(201).json({
    status: 'success',
    data: result
  })
})
