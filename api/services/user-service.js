// Helpers
const statusCode = require('../helpers/status-code')
const response = require('../helpers/response')

// Models
const { User } = require('../database/models/index')

class UserService {
  static async signUp (res, data) {
    const user = await User.create(data)
    response.success(res, statusCode.CREATED, user, 'You have registered successfully')
  }
}

module.exports = UserService