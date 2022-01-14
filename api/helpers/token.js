const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

class Token {
  static generate (userId, role) {
    const payload = {
      sub: userId,
      role: role,
      iat: dayjs().unix(), // Creation date
      exp: dayjs().add(10, 'second').unix() // Expiration date
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY) // Return the token
  }

  static verify (token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY) // Return the payload
  }
}

module.exports = Token