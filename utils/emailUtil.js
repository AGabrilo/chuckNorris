const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  })

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: 'Joke',
    text: options.message
  }

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = sendEmail
