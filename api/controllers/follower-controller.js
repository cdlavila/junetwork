// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Service
const FollowerService = require('../services/follower-service')

class FollowerController {
  static async create (req, res) {
    try {
      return await FollowerService.create(res, req?.user?.id, req?.params?.followedId)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async delete (req, res) {
    try {
      return await FollowerService.delete(res, req?.user?.id, req?.params?.followedId)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }
}

module.exports = FollowerController