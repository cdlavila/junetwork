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
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async getByPost (req, res) {
    try {
      return await CommentService.getByPost(res, req?.params?.postId)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async update (req, res) {
    try {
      return await CommentService.update(res, req?.body, req?.params?.id, req?.user?.id)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }

  static async delete (req, res) {
    try {
      return await CommentService.delete(res, req?.params?.id, req?.user?.id)
    } catch (error) {
      return Response.error(res, statusCode?.SERVER_ERROR, error)
    }
  }
}

module.exports = CommentController