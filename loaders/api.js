const route = require('../routes')

module.exports = async (app) => {
  route.init()
  app.use('/api', route.rootRouter)

  return app
}
