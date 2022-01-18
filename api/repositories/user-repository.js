// Models
const { User } = require('../database/models/index')

class UserRepository {
  static async create (data) {
    return User.create(data)
  }

  static async findAll () {
    return User.findAll()
  }

  static async findById (id) {
    return User.findByPk(id)
  }

  static async findByEmail (email) {
    return User.findOne({
      where: { email }
    })
  }

  static async update (data, id) {
    return User.update(data, {
      where: { id }
    })
  }

  static async delete (id) {
    return User.destroy({
      where: { id }
    })
  }
}

module.exports = UserRepository
