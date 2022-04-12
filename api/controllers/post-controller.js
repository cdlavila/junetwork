// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Service
const PostService = require('../services/post-service')

class PostController {
  static async create (req, res) {
    try {
      return await PostService.create(res, req?.body, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getNews (req, res) {
    try {
      return await PostService.getNews(res, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getMine (req, res) {
    try {
      return await PostService.getByUser(res, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async getByUser (req, res) {
    try {
      return await PostService.getByUser(res, req?.params?.userId, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async update (req, res) {
    try {
      return await PostService.update(res, req?.body, req?.params?.id, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }

  static async delete (req, res) {
    try {
      return await PostService.delete(res, req?.params?.id, req?.user?.id)
    } catch (error) {
      const statusName = error?.name?.includes('Sequelize')? 'BAD_REQUEST' : 'SERVER_ERROR'
      return Response.error(res, statusCode[statusName], error)
    }
  }
}

module.exports = PostController