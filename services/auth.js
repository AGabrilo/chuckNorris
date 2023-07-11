const { UserModel } = require('../models')

module.exports.createUser = async (userObject) => {
  return await UserModel.create({ ...userObject })
}

module.exports.loginUser = async (email) => {
  return await UserModel.findOne({ email }).select('+password')
}

module.exports.getUserById = async (userId) => {
  return await UserModel.findById(userId)
}
