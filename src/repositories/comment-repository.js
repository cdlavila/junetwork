// Models
const { Comment, User } = require('../database/models/index')

class CommentRepository {
  static async create (data) {
    return Comment.create(data)
  }

  static async getById (id) {
    return Comment.findByPk(id)
  }

  static async getByPost (postId) {
    return Comment.findAll({
      where: { post_id: postId },
      attributes: { exclude: ['post_id', 'user_id'] },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'picture']
      }
    })
  }

  static async getCountByPost (postId) {
    return Comment.count({
      where: { post_id: postId }
    })
  }

  static async update (data, id) {
    return Comment.update(data, {
      where: { id }
    })
  }

  static async delete (id) {
    return Comment.destroy({
      where: { id }
    })
  }
}

module.exports = CommentRepository
