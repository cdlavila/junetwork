// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')
const Token = require('../helpers/token')

// Models
const { User } = require('../database/models/index')

async function checkAuthentication (req, res, next) {
  try {
    // Validate that token was sent
    if (!req?.headers?.authorization) {
      return Response.error(res, statusCode?.NOT_AUTHORIZED, 'Token is required')
    }

    // Validate token structure
    const bearer = req?.headers?.authorization.split(' ')[0]

    if (bearer !== 'Bearer') {
      return Response.error(res, statusCode?.NOT_AUTHORIZED, 'Token structure is invalid')
    }

    // Verify token
    const token = req?.headers?.authorization.split(' ')[1]
    const payload = Token.verify(token, process.env.TOKEN_SECRET_KEY)

    // Verify user role
    let user
    switch (payload?.role) {
      case 'user':
        user = await User.findByPk(payload?.sub)
        break
      default:
        user = null
    }

    // Validate that user still exits
    if (!user) {
      return Response.error(res, statusCode?.NOT_AUTHORIZED, 'The user no longer exists')
    }

    req.user = user.dataValues
    req.userRole = payload?.role
    next()
  } catch (error) {
    return Response.error(res, statusCode?.NOT_AUTHORIZED, error)
  }
}

module.exports = checkAuthentication