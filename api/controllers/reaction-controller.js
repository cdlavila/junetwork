// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Service
const ReactionService = require('../services/reaction-service')

class ReactionController {
  static async togglePost (req, res) {
    try {
      return await ReactionService.togglePost(res, req?.body, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async toggleComment (req, res) {
    try {
      return await ReactionService.toggleComment(res, req?.body, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getByPost (req, res) {
    try {
      return await ReactionService.getByPost(res, req?.params?.postId)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getByComment (req, res) {
    try {
      return await ReactionService.getByComment(res, req?.params?.commentId)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }
}

module.exports = ReactionController
