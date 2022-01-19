// Models
const { Follower } = require('../database/models/index')

class UserRepository {
  static async create (followerId, followedId) {
    return Follower.create({
      follower_id: followerId,
      followed_id: followedId
    })
  }

  static async delete (followerId, followedId) {
    return Follower.destroy({
        where: {
          follower_id: followerId,
          followed_id: followedId
        }
      }
    )
  }
}

module.exports = UserRepository
