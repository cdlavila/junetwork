// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Service
const CommentService = require('../services/comment-service')

class CommentController {
  static async create (req, res) {
    try {
      return await CommentService.create(res, req?.body, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getByPost (req, res) {
    try {
      return await CommentService.getByPost(res, req?.params?.postId, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async update (req, res) {
    try {
      return await CommentService.update(res, req?.body, req?.params?.id, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async delete (req, res) {
    try {
      return await CommentService.delete(res, req?.params?.id, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize') ? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }
}

module.exports = CommentController
