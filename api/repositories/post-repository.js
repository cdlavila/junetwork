// Models
const { Post, User, Follower } = require('../database/models/index')

class PostRepository {
  static async create (data) {
    return Post.create(data)
  }

  static async getNews (userId) {
    return Post.findAll({
      attributes: { exclude: ['user_id'] },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'picture'],
        required: true,
        include: {
          model: Follower,
          as: 'following',
          where: { follower_id: userId },
          attributes: [],
          required: true
        }
      },
      order: [['creation_date', 'DESC']]
    })
  }


  static async getById (id) {
    return Post.findByPk(id)
  }

  static async getByUser (userId) {
    return Post.findAll({ where: { user_id: userId} })
  }

  static async update (data, id) {
    return Post.update(data, {
      where: { id }
    })
  }

  static async delete (id) {
    return Post.destroy({
      where: { id }
    })
  }
}

module.exports = PostRepository