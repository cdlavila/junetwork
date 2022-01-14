// Helpers
const statusCode = require('../helpers/status-code')
const response = require('../helpers/response')

// Service
const UserService = require('../services/user-service')

class UserController {
  static async signUp (req, res) {
    try {
      return await UserService.signUp(res, req?.body)
    } catch (error) {
      response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }
}

module.exports = UserController
