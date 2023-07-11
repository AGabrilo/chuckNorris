const express = require('express')
const router = express.Router()
const { AuthMiddleware } = require('../middlewares')
const { JokeController } = require('../controllers')

function init () {
  router.get('/', AuthMiddleware, JokeController.getJoke)
}

module.exports = {
  router,
  init
}
