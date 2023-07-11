require('dotenv').config()
const express = require('express')
const loaders = require('./loaders')

async function startServer () {
  const app = express()
  app.use(express.json())

  const port = process.env.PORT
  // run loaders
  await loaders.init(app)

  const server = app.listen(port, () => {
    console.log('Running on port ' + port)
  })

  process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('Undandled rejection! Shutting down... ')
    server.close(() => {
      process.exit(1)
    })
  })
}

startServer()
