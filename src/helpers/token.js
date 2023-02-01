const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

class Token {
  static generate (userId, role) {
    const payload = {
      sub: userId,
      role,
      iat: dayjs().unix(), // Creation time
      exp: dayjs().add(1, 'month').unix() // Expiration time (1 month)
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY) // Return the token
  }

  static verify (token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY) // Return the payload
  }
}

module.exports = Token
