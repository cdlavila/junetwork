// Models
const { Comment } = require('../database/models/index')

class CommentRepository {
  static async create (data) {
    return Comment.create(data)
  }

  static async getById (id) {
    return Comment.findByPk(id)
  }

  static async getCountByPost (postId){
    const { count } = await Comment.findAndCountAll({
      where: { post_id: postId }
    })
    return count
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