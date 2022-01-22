// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Repository
const PostRepository = require('../repositories/post-repository')

class PostService {
  static async create (res, data, userId) {
    const post = await PostRepository.create({ ...data, user_id: userId })
    return Response.success(res, statusCode?.CREATED, post, 'The post has been successfully created')
  }

  static async getNews (res, userId) {
    const posts = await PostRepository.getNews(userId)
    return Response.success(res, statusCode?.OK, posts, `News for user of id: ${userId}`)
  }

  static async getByUser (res, userId) {
    const posts = await PostRepository.getByUser(userId)
    return Response.success(res, statusCode?.OK, posts, `Posts of user of id: ${userId}`)
  }

  static async update (res, data, id, userId) {
    let post = await PostRepository.getById(id)
    if (!post) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No post with this id exists')
    }
    if (post?.user_id !== userId) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'You cannot update this post because it does not belong to you')
    }
    await PostRepository.update({ ...data, user_id: userId}, id)
    post = await PostRepository.getById(id)
    return Response.success(res, statusCode?.OK, post, 'The post has been successfully updated')
  }

  static async delete (res, id, userId) {
    const post = await PostRepository.getById(id)
    if (!post) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No post with this id exists')
    }
    if (post?.user_id !== userId) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'You cannot delete this post because it does not belong to you')
    }
    await PostRepository.delete(id)
    return Response.success(res, statusCode?.NO_CONTENT)
  }
}

module.exports = PostService