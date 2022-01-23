// Models
const { Reaction } = require('../database/models/index')

class ReactionRepository {
  static async create (data) {
    return Reaction.create(data)
  }

  static async getCountByPost (postId){
    const { count } = await Reaction.findAndCountAll({
      where: { post_id: postId }
    })
    return count
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