// Models
const { Reaction, User } = require('../database/models/index')

class ReactionRepository {
  static async create (data) {
    return Reaction.create(data)
  }

  static async get (data) {
    return Reaction.findOne({
      where: data
    })
  }

  static async getById (id) {
    return Reaction.findByPk(id)
  }

  static async getByPost (postId) {
    return Reaction.findAll({
      where: { post_id: postId },
      attributes: ['id', 'emoji'],
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'picture']
      }
    })
  }

  static async getByComment (commentId) {
    return Reaction.findAll({
      where: { comment_id: commentId },
      attributes: ['id', 'emoji'],
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'picture']
      }
    })
  }

  static async getCountByPost (postId) {
    return Reaction.count({
      where: { post_id: postId }
    })
  }

  static async getCountByComment (commentId) {
    return Reaction.count({
      where: { comment_id: commentId }
    })
  }

  static async update (data, id) {
    return Reaction.update(data, {
      where: { id }
    })
  }

  static async delete (id) {
    return Reaction.destroy({
      where: { id }
    })
  }
}

module.exports = ReactionRepository
