const mongoose = require('mongoose')

module.exports = async () => {
  try {
    const databaseConnection = await mongoose.connect('mongodb://127.0.0.1:27017/chuck', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // load models
    require('../models')

    return databaseConnection
  } catch (error) {
    console.log('ERROR in mongoose', error)
  }
}
