const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

class Twilio {
  static async sendCodeBySms (phone, code) {
    await client.messages
      .create({
        from: `${process.env.TWILIO_PHONE}`,
        body: `Your code is ${code}`,
        to: `+57${phone}`
      })
  }

  static async sendCodeByWhatsApp (phone, code) {
    await client.messages
      .create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP}`,
        body: `Your code is ${code}`,
        to: `whatsapp:+57${phone}`
      })
  }
}

module.exports = Twilio
