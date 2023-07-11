module.exports.toUserObject = (req) => {
  return {
    email: req.body.email,
    password: req.body.password,
    repeatedPassword: req.body.repeatedPassword,
    ...req.body.firstName && { firstName: req.body.firstName },
    ...req.body.lastName && { lastName: req.body.lastName }
  }
}
