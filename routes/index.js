const express = require('express')
const rootRouter = express.Router()
const AppError = require('../utils/appError')
const globalErrorHandler = require('../utils/globalErrorHandler')

function init () {
  const authRouter = require('./auth')
  authRouter.init()

  const jokeRouter = require('./joke')
  jokeRouter.init()

  rootRouter.use('/auth', authRouter.router)
  rootRouter.use('/joke', jokeRouter.router)

  rootRouter.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404))
  })
  rootRouter.use(globalErrorHandler)
}

module.exports = {
  rootRouter,
  init
}
