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

  static async getMyFollowers (req, res) {
    try {
      return await FollowerService.getFollowers(res, req?.user?.id)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async getWhoIAmFollowing (req, res) {
    try {
      return await FollowerService.getFollowing(res, req?.user?.id)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async getFollowers (req, res) {
    try {
      return await FollowerService.getFollowers(res, req?.params?.userId)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async getFollowing (req, res) {
    try {
      return await FollowerService.getFollowing(res, req?.params?.userId)
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