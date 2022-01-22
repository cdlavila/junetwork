// Models
const { Comment } = require('../database/models/index')

class CommentRepository {
  static async create (data) {
    return Comment.create(data)
  }

  static async getById (id) {
    return Comment.findByPk(id)
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