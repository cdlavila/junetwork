// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Repository
const ReactionRepository = require('../repositories/reaction-repository')

class ReactionService {
  static async togglePost (res, data, userId) {
    const reaction = await ReactionRepository.get({ post_id: data?.post_id, user_id: userId })
    if (!reaction) { // Create
      const reaction = await ReactionRepository.create({ ...data, comment_id: null, user_id: userId })
      return Response.success(res, statusCode?.CREATED, reaction, 'The reaction has been successfully created')
    }
    if (data?.emoji !== reaction?.emoji) { // Update
      await ReactionRepository.update({ ...data, comment_id: null }, reaction?.id)
      const newReaction = await ReactionRepository.getById(reaction?.id)
      return Response.success(res, statusCode?.OK, newReaction, 'The reaction has been successfully updated')
    }
    // Delete
    await ReactionRepository.delete(reaction?.id)
    return Response.success(res, statusCode?.NO_CONTENT)
  }

  static async toggleComment (res, data, userId) {
    const reaction = await ReactionRepository.get({ comment_id: data?.comment_id, user_id: userId })
    if (!reaction) { // Create
      const reaction = await ReactionRepository.create({ ...data, post_id: null, user_id: userId })
      return Response.success(res, statusCode?.CREATED, reaction, 'The reaction has been successfully created')
    }
    if (data?.emoji !== reaction?.emoji) { // Update
      await ReactionRepository.update({ ...data, post_id: null }, reaction?.id)
      const newReaction = await ReactionRepository.getById(reaction?.id)
      return Response.success(res, statusCode?.OK, newReaction, 'The reaction has been successfully updated')
    }
    // Delete
    await ReactionRepository.delete(reaction?.id)
    return Response.success(res, statusCode?.NO_CONTENT)
  }

  static async getByPost (res, postId) {
    const reactions = await ReactionRepository.getByPost(postId)
    return Response.success(res, statusCode?.OK, reactions, `Reactions list of the post of id: ${postId}`)
  }

  static async getByComment (res, commentId) {
    const reactions = await ReactionRepository.getByComment(commentId)
    return Response.success(res, statusCode?.OK, reactions, `Reactions list of the comment of id: ${commentId}`)
  }
}

module.exports = ReactionService
