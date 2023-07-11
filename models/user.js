const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    require: [true, 'Enter email'],
    validate: [validator.isEmail, 'Provide valid email']
  },
  password: {
    type: String,
    require: [true, 'Enter password'],
    minlength: 8,
    select: false
  },
  repeatedPassword: {
    type: String,
    require: [true, 'Repeat password'],
    validate: {
      validator: function (el) {
        return el === this.password
      }
    }
  }

})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.repeatedPassword = undefined
  next()
})

UserSchema.methods.checkPassword = async function (inputPassw, userPassw) {
  return await bcrypt.compare(inputPassw, userPassw)
}

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel
