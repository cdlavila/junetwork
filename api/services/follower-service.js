// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')

// Repository
const FollowerRepository = require('../repositories/follower-repository')

class FollowerService {
  static async create (res, followerId, followedId) {
    const follower = await FollowerRepository.create(followerId, followedId)
    return Response.success(res, statusCode?.CREATED, follower, 'Follower created successfully')
  }

  static async getFollowers (res, followedId) {
    const followers = await FollowerRepository.getFollowers(followedId)
    return Response.success(res, statusCode?.OK, followers, 'Followers')
  }

  static async getFollowing (res, followerId) {
    const following = await FollowerRepository.getFollowing(followerId)
    return Response.success(res, statusCode?.OK, following, 'Following')
  }

  static async delete (res, followerId, followedId) {
    await FollowerRepository.delete(followerId, followedId)
    return Response.success(res, statusCode?.NO_CONTENT)
  }
}

module.exports = FollowerService