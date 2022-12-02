const nodemailer = require('nodemailer')

async function sendEmail (to, subject, body, html = false) {
  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // Send mail with defined transport object
  const data = {
    from: process.env.EMAIL,
    to: to,
    subject: subject
  }
  if (html) { data.html = body } else { data.text = body }

  const info = await transporter.sendMail(data)

  return info?.messageId
}

module.exports = { sendEmail }
