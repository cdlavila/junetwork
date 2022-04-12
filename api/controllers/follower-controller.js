// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Service
const FollowerService = require('../services/follower-service')

class FollowerController {
  static async toggle (req, res) {
    try {
      return await FollowerService.toggle(res, req?.user?.id, req?.body?.followed_id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getMyFollowers (req, res) {
    try {
      return await FollowerService.getFollowers(res, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getWhoIAmFollowing (req, res) {
    try {
      return await FollowerService.getFollowing(res, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getFollowers (req, res) {
    try {
      return await FollowerService.getFollowers(res, req?.params?.userId)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getFollowing (req, res) {
    try {
      return await FollowerService.getFollowing(res, req?.params?.userId)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }
}

module.exports = FollowerController
