// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Repository
const CommentRepository = require('../repositories/comment-repository')
const ReactionRepository = require('../repositories/reaction-repository')

class CommentService {
  static async create (res, data, userId) {
    const comment = await CommentRepository.create({ ...data, user_id: userId })
    return Response.success(res, statusCode?.CREATED, comment, 'The comment has been successfully created')
  }

  static async getByPost (res, postId) {
    const comments = await CommentRepository.getByPost(postId)
    for (const comment of comments) {
      comment.dataValues.reactions = await ReactionRepository.getCountByComment(comment?.id)
    }
    return Response.success(res, statusCode?.OK, comments, `Comments list of the post of id: ${postId}`)
  }

  static async update (res, data, id, userId) {
    let comment = await CommentRepository.getById(id)
    if (!comment) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No comment with this id exists')
    }
    if (comment?.user_id !== userId) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'You cannot update this comment because it does not belong to you')
    }
    await CommentRepository.update({ ...data, post_id: comment.post_id, user_id: userId}, id)
    comment = await CommentRepository.getById(id)
    return Response.success(res, statusCode?.OK, comment, 'The comment has been successfully updated')
  }

  static async delete (res, id, userId) {
    const comment = await CommentRepository.getById(id)
    if (!comment) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No comment with this id exists')
    }
    if (comment?.user_id !== userId) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'You cannot delete this comment because it does not belong to you')
    }
    await CommentRepository.delete(id)
    return Response.success(res, statusCode?.NO_CONTENT)
  }
}

module.exports = CommentService