// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

function checkRoles (roles) {
  try {
    return (req, res, next) => {
      // Verify checkRoles
      if (roles.includes(req?.userRole)) {
        next()
      } else {
       return Response.error(res, statusCode?.PERMISSION_DENIED, 'User has not permission for this action')
      }
    }
  } catch (error) {
    return Response.error(res, statusCode?.SERVER_ERROR, error)
  }
}

module.exports = checkRoles